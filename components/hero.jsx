"use client";
import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
	// Replace these paths with your real banner images. The image you sent can be placed at /public/images/banner1.jpg
	const images = [
		'/herobanner/carosal1.webp', // <- replace with the banner you provided
		'/herobanner/carosal2.webp', // optional: add more banners or duplicate the first for demo
		'/herobanner/carosal3.webp'
	];

	const [index, setIndex] = useState(0);
	const intervalRef = useRef(null);

	const next = () => setIndex((i) => (i + 1) % images.length);
	const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
	const goTo = (i) => setIndex(i);

	useEffect(() => {
		// autoplay every 5 seconds
		intervalRef.current = setInterval(() => {
			setIndex((i) => (i + 1) % images.length);
		}, 5000);
		return () => clearInterval(intervalRef.current);
	}, [images.length]);

	// minimal inline styles so no extra CSS file is required
	const containerStyle = {
		position: 'relative',
		overflow: 'hidden',
		width: '100%',
		height: '460px', // adjust height as needed or make responsive
		display: 'block',
		background: '#000'
	};

	const trackStyle = {
		display: 'flex',
		height: '100%',
		transition: 'transform 600ms ease',
		transform: `translateX(-${index * 100}%)`
	};

	const slideStyle = (src) => ({
		minWidth: '100%',
		height: '100%',
		backgroundImage: `url(${src})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat'
	});

	const arrowCommon = {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		background: 'rgba(0,0,0,0.5)',
		color: '#fff',
		border: 'none',
		padding: '12px',
		cursor: 'pointer',
		borderRadius: '50%',
		zIndex: 5
	};

	// Bars-style dots positioned below the carousel
	const dotContainer = {
		display: 'flex',
		justifyContent: 'center',
		gap: '24px', // wider gap to match the reference image
		alignItems: 'center',
		marginTop: '12px',
		paddingBottom: '8px'
	};

	// active: center short maroon bar; inactive: longer black/gray bars
	const dotStyle = (active) => ({
		width: active ? '28px' : '48px', // active is shorter
		height: '4px',
		borderRadius: '2px',
		background: active ? '#b83b3b' : '#0b0b0b', // maroon for active, black for inactive
		opacity: active ? 1 : 1,
		cursor: 'pointer',
		boxShadow: active ? '0 0 0 1px rgba(184,59,59,0.12) inset' : 'none'
	});

	return (
		<>
			<div style={containerStyle} aria-roledescription="carousel">
				<div style={trackStyle}>
					{images.map((src, i) => (
						<div key={i} style={slideStyle(src)} role="group" aria-label={`slide ${i + 1}`}>
							{/* If you need overlay content, add it here */}
						</div>
					))}
				</div>

				{/* Prev / Next */}
				<button
					aria-label="Previous slide"
					onClick={() => {
						prev();
						clearInterval(intervalRef.current);
					}}
					style={{ ...arrowCommon, left: '18px' }}
				>
					‹
				</button>
				<button
					aria-label="Next slide"
					onClick={() => {
						next();
						clearInterval(intervalRef.current);
					}}
					style={{ ...arrowCommon, right: '18px' }}
				>
					›
				</button>
			</div>

			{/* Dots - moved below the carousel */}
			<div style={dotContainer}>
				{images.map((_, i) => (
					<div
						key={i}
						role="button"
						aria-label={`Go to slide ${i + 1}`}
						onClick={() => {
							goTo(i);
							clearInterval(intervalRef.current);
						}}
						style={dotStyle(i === index)}
					/>
				))}
			</div>
		</>
	);
}

export default Hero;
