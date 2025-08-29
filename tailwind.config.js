/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2.25rem', // 增加容器内边距以适应更大的字体
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				primary: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
				},
				teal: {
					50: '#f0fdfa',
					100: '#ccfbf1',
					200: '#99f6e4',
					300: '#5eead4',
					400: '#2dd4bf',
					500: '#14b8a6',
					600: '#0d9488',
					700: '#0f766e',
					800: '#115e59',
					900: '#134e4a',
				},
				emerald: {
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#10b981',
					600: '#059669',
					700: '#047857',
					800: '#065f46',
					900: '#064e3b',
				},
				violet: {
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95',
				},
				orange: {
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
				},
			},
		},
		extend: {
			fontSize: {
				// 扩大所有字体大小（增加12.5%）
				'xs': ['0.8125rem', { lineHeight: '1.125rem' }],   // 13px
				'sm': ['0.9375rem', { lineHeight: '1.375rem' }],   // 15px
				'base': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
				'lg': ['1.25rem', { lineHeight: '1.875rem' }],     // 20px
				'xl': ['1.375rem', { lineHeight: '2rem' }],        // 22px
				'2xl': ['1.6875rem', { lineHeight: '2.25rem' }],   // 27px
				'3xl': ['2.125rem', { lineHeight: '2.5rem' }],     // 34px
				'4xl': ['2.5rem', { lineHeight: '2.75rem' }],      // 40px
				'5xl': ['3.375rem', { lineHeight: '3.5rem' }],     // 54px
				'6xl': ['4.25rem', { lineHeight: '4.5rem' }],      // 68px
				'7xl': ['5.0625rem', { lineHeight: '5.25rem' }],   // 81px
				'8xl': ['6.75rem', { lineHeight: '7rem' }],        // 108px
				'9xl': ['9rem', { lineHeight: '9.25rem' }],        // 144px
			},
			spacing: {
				// 相应调整间距以保持布局
				'18': '4.5rem',   // 72px
				'22': '5.5rem',   // 88px
				'26': '6.5rem',   // 104px
				'30': '7.5rem',   // 120px
				'34': '8.5rem',   // 136px
				'38': '9.5rem',   // 152px
				'42': '10.5rem',  // 168px
				'46': '11.5rem',  // 184px
				'50': '12.5rem',  // 200px
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2B5D3A',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#4A90E2',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: '#F5A623',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				scroll: {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(calc(-100% + 384px))' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scroll': 'scroll 32s linear infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}