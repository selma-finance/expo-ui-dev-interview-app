import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import { ResponsiveValue, useTheme } from "@shopify/restyle"
import React, { ComponentProps, PropsWithChildren, useEffect, useImperativeHandle, useRef } from "react"
import { BackHandler } from "react-native"
import { ReduceMotion, WithSpringConfig, WithTimingConfig } from "react-native-reanimated"
import { Theme } from "src/styling/restyle/defaultTheme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Box from "src/components/Box"
import Button from "src/components/Button/Button"
import spacing from "src/styling/spacing"
import { isE2E } from "src/utils/isE2E"

// Added 25% snap point just to fix a weird bug that makes the sheet not use the snap point at all and go wild when the index is set to 0
const SNAP_POINTS = ["25%", "50%", "75%", "90%"]

// In E2E, collapse the snap spring to a single frame so Maestro can't capture
// the sheet mid-animation. The backdrop opacity is derived from the same
// animatedIndex via interpolate(), so killing the spring kills the backdrop
// fade too.
const E2E_INSTANT_ANIMATION: WithTimingConfig = { duration: 0 }

// @gorhom/bottom-sheet's internal MODAL_STATUS.CLOSED (the enum is not exported).
const GORHOM_MODAL_STATUS_CLOSED = 2

export enum BottomModalInitialHeight {
  HALF_OF_SCREEN_HEIGHT = 1,
  THREE_QUARTERS_OF_SCREEN_HEIGHT = 2,
  NINETY_PERCENT_OF_SCREEN_HEIGHT = 3,
}

export interface BottomModalProps {
  testID?: string
  initialHeight?: BottomModalInitialHeight
  closeable?: boolean
  stackBehavior?: ComponentProps<typeof BottomSheetModal>["stackBehavior"]
  enableContentPanningGesture?: boolean
  enableHandlePanningGesture?: boolean
  withScrollView?: boolean
  footerContent?: React.ReactNode
  enableDynamicSizing?: boolean
  detached?: boolean
  onClose?: () => void
}

export interface BasicBottomModalHandles {
  show: () => void
  close: () => void
}

export interface BottomModalHandles extends BasicBottomModalHandles {
  snapToPosition?: (position: number | string, animationConfigs?: WithSpringConfig | WithTimingConfig) => void
  snapToIndex?: (index: number, animationConfigs?: WithSpringConfig | WithTimingConfig) => void
  forceDismiss?: () => void
}

interface FooterButtonProps {
  label: string
  onPress: () => void
  disabled?: boolean
  backgroundColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>
}

const FooterButton: React.FC<FooterButtonProps> = ({ label, onPress, disabled, backgroundColor }) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Box position="absolute" bottom={0} width="100%" backgroundColor={backgroundColor}>
      <Box paddingBottom="offsetXs" paddingTop="none">
        <Box paddingTop="s" style={{ paddingBottom: bottom }}>
          <Button marginHorizontal="s" variant="primary" label={label} disabled={disabled} onPress={onPress} />
        </Box>
      </Box>
    </Box>
  )
}

interface BottomModalComposition {
  (props: PropsWithChildren<BottomModalProps> & { ref?: React.Ref<BottomModalHandles> }): React.ReactNode
  FooterButton: typeof FooterButton
}

const BottomModal: BottomModalComposition = Object.assign(
  function BottomModalComponent({
    children,
    initialHeight = BottomModalInitialHeight.HALF_OF_SCREEN_HEIGHT,
    closeable = true,
    stackBehavior = "replace",
    withScrollView = true,
    enableContentPanningGesture = true,
    enableHandlePanningGesture = true,
    footerContent,
    enableDynamicSizing = false,
    detached = false,
    onClose,
    ref,
  }: PropsWithChildren<BottomModalProps> & { ref?: React.Ref<BottomModalHandles> }) {
    const sheetRef = useRef<BottomSheetModal>(null)
    const backHandlerSubscriptionRef = useRef<ReturnType<typeof BackHandler.addEventListener> | null>(null)

    const { colors } = useTheme<Theme>()
    // Clamp the sheet's top to the safe area so that when the keyboard extends it (a focused
    // BottomSheetTextInput pushes the footer + sheet up), the top can't slide under the status
    // bar / dynamic island. gorhom uses topInset as the sheet's max top position.
    const { top: safeAreaTop } = useSafeAreaInsets()

    const removeBackHandler = () => {
      backHandlerSubscriptionRef.current?.remove()
      backHandlerSubscriptionRef.current = null
    }

    useEffect(() => () => removeBackHandler(), [])

    const show = () => {
      removeBackHandler()
      backHandlerSubscriptionRef.current = BackHandler.addEventListener("hardwareBackPress", () => {
        if (!closeable) return true
        sheetRef.current?.close()
        return null
      })
      sheetRef.current?.present()
    }

    // A dropped close-animation completion wedges the sheet open: close()/dismiss() re-run
    // the close animation and wait on the same dead completion callback, and so does
    // gorhom's own React-unmount path (handlePortalOnUnmount), so not even unmounting this
    // component can remove the sheet (SEL-13045). dismiss() short-circuits to a synchronous
    // unmount — portal removed, onDismiss fired, no animation callbacks — only when the
    // modal's internal status is CLOSED/MINIMIZED, so force the status there first. The
    // status ref is on the imperative handle but missing from the public type; the enum is
    // internal too (CLOSED = 2, verified against @gorhom/bottom-sheet 5.2.14). If an
    // upgrade reshuffles either, this degrades back to the animated dismiss path.
    const forceDismiss = () => {
      const sheet = sheetRef.current
      if (!sheet) return
      const { status } = sheet as unknown as { status?: { current: number } }
      if (status) status.current = GORHOM_MODAL_STATUS_CLOSED
      sheet.dismiss()
    }

    useImperativeHandle(ref, () => ({
      show,
      close: () => sheetRef.current?.close(),
      snapToPosition: (position, animationConfigs) => sheetRef.current?.snapToPosition(position, animationConfigs),
      snapToIndex: (index, animationConfigs) => sheetRef.current?.snapToIndex(index, animationConfigs),
      forceDismiss,
    }))

    const renderBackdrop = (props: ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.25}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={closeable ? "close" : "none"}
      />
    )

    const detachedModalProps = detached
      ? { detached: true, style: { marginHorizontal: spacing.s }, bottomInset: spacing.l }
      : {}

    return (
      <BottomSheetModal
        ref={sheetRef}
        stackBehavior={stackBehavior}
        topInset={safeAreaTop}
        {...(enableDynamicSizing ? {} : { index: initialHeight, snapPoints: SNAP_POINTS })}
        enableDynamicSizing={enableDynamicSizing}
        animateOnMount={!isE2E()}
        animationConfigs={isE2E() ? E2E_INSTANT_ANIMATION : undefined}
        // Reduce motion (incl. Android "remove animations"/animation scales 0) is known to
        // break the sheet's internal animations, which can drop the dismiss completion. A
        // non-closeable sheet gives the user no way to recover from that, so it must drive
        // its own animations reliably (SEL-13005); closeable sheets keep honoring the
        // system setting.
        overrideReduceMotion={closeable ? undefined : ReduceMotion.Never}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.backgroundSurface }}
        enablePanDownToClose={closeable}
        {...detachedModalProps}
        enableContentPanningGesture={enableContentPanningGesture}
        enableHandlePanningGesture={enableHandlePanningGesture}
        footerComponent={props =>
          footerContent ? <BottomSheetFooter {...props}>{footerContent}</BottomSheetFooter> : null
        }
        onDismiss={() => {
          removeBackHandler()
          onClose?.()
        }}
      >
        {withScrollView ? (
          <BottomSheetScrollView>{children}</BottomSheetScrollView>
        ) : (
          <BottomSheetView style={enableDynamicSizing ? undefined : { height: "100%" }}>{children}</BottomSheetView>
        )}
      </BottomSheetModal>
    )
  },
  { FooterButton }
)

export default BottomModal
