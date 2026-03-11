import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
      richColors
      closeButton
      duration={3500}
      toastOptions={{
        classNames: {
          toast: `
      group toast
      bg-white/60 dark:bg-white/10
      backdrop-blur-2xl
      text-foreground
      border border-white/50 dark:border-white/15
      shadow-[0_4px_20px_rgba(0,0,0,0.08)]
      rounded-2xl
      px-5 py-4
      flex items-center gap-3
    `,
          title: "font-semibold text-[15px]",
          description: "text-sm text-foreground/70",
          actionButton: `
      bg-white/70 dark:bg-white/15
      text-foreground
      hover:bg-white/90 dark:hover:bg-white/25
      rounded-lg px-3 py-1.5 text-sm font-medium
      backdrop-blur-md
    `,
          cancelButton: `
      bg-white/60 dark:bg-white/10
      text-foreground/60
      hover:bg-white/80 dark:hover:bg-white/20
      rounded-lg px-3 py-1.5 text-sm
      backdrop-blur-md
    `,
          success: "border-emerald-400/40",
          error: "border-red-400/40",
          warning: "border-yellow-400/40",
          info: "border-sky-400/40",
        },
      }}


      {...props}
    />
  );
};

export { Toaster, toast };
