/** @type {import('tailwindcss').Config} */
// Remove the require for flattenColorPalette
// const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

/* Add custom flattenColorPalette implementation */
function flattenColorPalette(colors, prefix = '') {
    let result = {};
    for (const [key, value] of Object.entries(colors)) {
        if (typeof value === 'object') {
            Object.assign(result, flattenColorPalette(value, prefix ? `${prefix}-${key}` : key));
        } else {
            result[prefix ? `${prefix}-${key}` : key] = value;
        }
    }
    return result;
}

function addVariablesForColors({ addBase, theme }) {
    let allColors = flattenColorPalette(theme('colors'));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ':root': newVars,
    });
}

module.exports = {
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    darkMode: ['class', '[data-theme="dark-default"]'],
    theme: {
        container: {
            center: 'true',
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                hovering: {
                    DEFAULT: 'hsl(var(--hovering))',
                    foreground: 'hsl(var(--hovering-foreground))',
                },
                project_text: {
                    DEFAULT: 'hsl(var(--project_text))',
                    foreground: 'hsl(var(--project_text-foreground))',
                },
                tab_group: {
                    DEFAULT: 'hsl(var(--tab_group))',
                    foreground: 'hsl(var(--tab_group-foreground))',
                },
                seting_tab: {
                    DEFAULT: 'hsl(var(--seting_tab))',
                    foreground: 'hsl(var(--seting_tab-foreground))',
                },
                discussion_background: {
                    DEFAULT: 'hsl(var(--discussion_background))',
                    foreground: 'hsl(var(--discussion_background-foreground))',
                },
                discussion_border: {
                    DEFAULT: 'hsl(var(--discussion_border))',
                    foreground: 'hsl(var(--discussion_border-foreground))',
                },
                comment_text: {
                    DEFAULT: 'hsl(var(--comment_text))',
                    foreground: 'hsl(var(--comment_text-foreground))',
                },
                comment_background: {
                    DEFAULT: 'hsl(var(--comment_background))',
                    foreground: 'hsl(var(--comment_background-foreground))',
                },
                comment_hover: {
                    DEFAULT: 'hsl(var(--comment_hover))',
                    foreground: 'hsl(var(--comment_hover-foreground))',
                },
                plus_text: {
                    DEFAULT: 'hsl(var(--plus_text))',
                    foreground: 'hsl(var(--plus_text-foreground))',
                },
                plus_background: {
                    DEFAULT: 'hsl(var(--plus_background))',
                    foreground: 'hsl(var(--plus_background-foreground))',
                },
                plus_text_hover: {
                    DEFAULT: 'hsl(var(--plus_text_hover))',
                    foreground: 'hsl(var(--plus_text_hover-foreground))',
                },
                plus_background_hover: {
                    DEFAULT: 'hsl(var(--plus_background_hover))',
                    foreground: 'hsl(var(--plus_background_hover-foreground))',
                },
                auth_form_border: {
                    DEFAULT: 'hsl(var(--auth_form_border))',
                    foreground: 'hsl(var(--auth_form_border-foreground))',
                },
                not_found_background: {
                    DEFAULT: 'hsl(var(--not_found_background))',
                    foreground: 'hsl(var(--not_found_background-foreground))',
                },
                signup_complete_text: {
                    DEFAULT: 'hsl(var(--signup_complete_text))',
                    foreground: 'hsl(var(--signup_complete_text-foreground))',
                },
                sidebar: {
                    'DEFAULT': 'hsl(var(--sidebar-background))',
                    'foreground': 'hsl(var(--sidebar-foreground))',
                    'primary': 'hsl(var(--sidebar-primary))',
                    'primary-foreground':
                        'hsl(var(--sidebar-primary-foreground))',
                    'accent': 'hsl(var(--sidebar-accent))',
                    'accent-foreground':
                        'hsl(var(--sidebar-accent-foreground))',
                    'border': 'hsl(var(--sidebar-border))',
                    'ring': 'hsl(var(--sidebar-ring))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'caret-blink': {
                    '0%,70%,100%': { opacity: '1' },
                    '20%,50%': { opacity: '0' },
                },
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
                'meteor': {
                    '0%': {
                        transform: 'rotate(215deg) translateX(0)',
                        opacity: '1',
                    },
                    '70%': {
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'rotate(215deg) translateX(-500px)',
                        opacity: '0',
                    },
                },
                'aurora': {
                    from: {
                        backgroundPosition: '50% 50%, 50% 50%',
                    },
                    to: {
                        backgroundPosition: '350% 50%, 350% 50%',
                    },
                },
                'move': {
                    '0%': {
                        transform: 'translateX(-200px)',
                    },
                    '100%': {
                        transform: 'translateX(200px)',
                    },
                },
                'shimmer': {
                    from: {
                        backgroundPosition: '0 0',
                    },
                    to: {
                        backgroundPosition: '-200% 0',
                    },
                },
                'swingPause': {
                    '0%, 20%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-10deg)' },
                    '50%': { transform: 'rotate(10deg)' },
                    '75%': { transform: 'rotate(-10deg)' },
                    '80%, 100%': { transform: 'rotate(0deg)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'meteor-effect': 'meteor 5s linear infinite',
                'aurora': 'aurora 60s linear infinite',
                'move': 'move 5s linear infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'swingPause': 'swingPause 1s linear infinite',
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'mono': ['JetBrains Mono', 'monospace'],
                'monument': ['Monument Extended Regular', 'sans-serif'],
                'monument-bold': ['Monument Extended Ultrabold', 'sans-serif'],
            },
        },
    },
    plugins: [
        addVariablesForColors,
        require('tailwindcss-animate'),
    ],
};
