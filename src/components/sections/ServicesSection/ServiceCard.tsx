"use client"

import React from 'react'

export type ServiceCardProps = {
	title: string
	description?: string
	features?: string[]
	icon?: React.ReactNode
	/** hex color or CSS color value for the badge. Defaults to "#3DBEBE" */
	color?: string
	/** optional image url for the top placeholder area */
	imageUrl?: string
	onClick?: () => void
}

const DefaultIcon = () => (
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
		<path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
)

export default function ServiceCard({
	title,
	description,
	features = [],
	icon,
	color = '#3DBEBE',
	imageUrl,
	onClick,
}: ServiceCardProps) {
	const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (!onClick) return
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			onClick()
		}
	}

	// background color for icon badge - use hex color directly
	const badgeStyle: React.CSSProperties = {
		backgroundColor: color || '#3DBEBE',
		color: '#fff',
	}

	return (
		<div
			role={onClick ? 'button' : undefined}
			tabIndex={onClick ? 0 : undefined}
			onClick={onClick}
			onKeyDown={handleKey}
			className="bg-white text-gray-900 rounded-lg shadow-md w-full max-w-xs mx-auto overflow-hidden border-t-4"
			style={{ borderTopColor: color || '#3DBEBE' }}
			aria-label={title}
		>
			<div className="w-full h-36 bg-gray-100 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%,#ccc),linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%,#ccc)] bg-[length:20px_20px] bg-[position:0_0,10px_10px] flex items-center justify-center">
				{/** If imageUrl provided, render it; otherwise a checkered placeholder */}
				{imageUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={imageUrl} alt="service" className="w-full h-36 object-cover" />
				) : (
					<div className="w-24 h-16 rounded bg-white/60 border border-gray-300" />
				)}
			</div>

			<div className="p-6 flex flex-col items-stretch gap-4">
				<div className="flex items-start gap-4">
					<div
						className="w-14 h-14 rounded-md flex items-center justify-center shrink-0"
						style={badgeStyle}
						aria-hidden
					>
						<span className="w-6 h-6" style={{ display: 'inline-block' }}>
							{icon ?? <DefaultIcon />}
						</span>
					</div>

					<div className="min-w-0">
						<h3 className="text-sm font-semibold leading-tight truncate">{title}</h3>
						{description && (
							<p className="text-xs text-gray-600 mt-1 leading-snug">{description}</p>
						)}
					</div>
				</div>

				{features.length > 0 && (
					<ul className="mt-2 space-y-1 pl-5 text-xs">
						{features.map((f, i) => (
							<li key={i} className="list-disc text-black" style={{ color: '#F78053' }}>
								{f}
							</li>
						))}
					</ul>
				)}

				<div className="mt-4">
					<button
						type="button"
						onClick={onClick}
						className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full text-sm border-2 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium"
						style={{ borderColor: '#ccc' }}
					>
						Saiba Mais
					</button>
				</div>
			</div>
		</div>
	)
}
