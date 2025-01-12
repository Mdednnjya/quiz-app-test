import {LoadingSpinner} from "@/components/ui/loading-spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'outline';
    fullWidth?: boolean;
    loading?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    fullWidth = false,
    loading = false,
    ...props
    }: ButtonProps) => {
    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={`
        ${fullWidth ? 'w-full' : ''}
        px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center
        ${loading ? 'opacity-70 cursor-not-allowed' : ''}
        ${variant === 'primary'
                ? 'bg-primary hover:bg-primary-dark text-white'
                : 'border-2 border-primary text-primary hover:bg-primary-50'}
      `}
        >
            {loading ? (
                <>
                    <LoadingSpinner />
                    <span className="ml-2">Loading...</span>
                </>
            ) : children}
        </button>
    );
};