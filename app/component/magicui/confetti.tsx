import confetti from "canvas-confetti";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import type {
  ReactNode,
  ComponentPropsWithRef,
} from "react";

import type {
  GlobalOptions as ConfettiGlobalOptions,
  Options as ConfettiOptions,
  CreateTypes as ConfettiInstance,
} from "canvas-confetti";

type Api = {
  fire: (options?: ConfettiOptions) => void;
};

type Props = ComponentPropsWithRef<"canvas"> & {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  children?: ReactNode;
};

export type ConfettiRef = Api | null;

const ConfettiContext = createContext<Api>({} as Api);

const Confetti = forwardRef<ConfettiRef, Props>((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    ...rest
  } = props;

  const instanceRef = useRef<ConfettiInstance | null>(null);

  const canvasRef = useCallback((node: HTMLCanvasElement | null) => {
    if (node !== null) {
      if (!instanceRef.current) {
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        });
      }
    } else {
      if (instanceRef.current) {
        instanceRef.current.reset();
        instanceRef.current = null;
      }
    }
  }, [globalOptions]);

  const fire = useCallback((opts = {}) => {
    instanceRef.current?.({ ...options, ...opts });
  }, [options]);

  const api = useMemo(() => ({
    fire,
  }), [fire]);

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      fire();
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={api}>
      <canvas ref={canvasRef} {...rest} />
      {children}
    </ConfettiContext.Provider>
  );
});

Confetti.displayName = 'Confetti';

export { Confetti };
export default Confetti;
