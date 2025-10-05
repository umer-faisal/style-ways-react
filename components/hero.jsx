"use client";
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const Hero = () => {
	return (
		<div style={{
			position: 'relative',
			width: '100%',
			height: '500px',
			backgroundImage: 'url(/herobanner/banner1.jpg)',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			overflow: 'hidden'
		}}>
			{/* Overlay */}
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: 'rgba(0, 0, 0, 0.4)',
				zIndex: 1
			}} />
			
			{/* Hero Content */}
			<div style={{
				position: 'relative',
				zIndex: 2,
				textAlign: 'center',
				color: 'white',
				padding: '0 20px'
			}}>
				<h1 style={{
					fontSize: '3.5rem',
					fontWeight: 'bold',
					margin: '0 0 20px 0',
					textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
					letterSpacing: '2px'
				}}>
					StyleWays
				</h1>
				<p style={{
					fontSize: '1.2rem',
					margin: '0 0 30px 0',
					textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
					maxWidth: '600px',
					margin: '0 auto 30px auto'
				}}>
					Discover Your Perfect Style - Where Fashion Meets Comfort
				</p>
				<Button 
					size="lg"
					className="cursor-pointer text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
				>
					<Link href="/products">
					Shop Now
					</Link>
				</Button>
			</div>

			{/* External Link */}
			{/* <a 
				href="https://www.styleways.pk" 
				target="_blank" 
				rel="noopener noreferrer"
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: 3,
					textDecoration: 'none',
					cursor: 'pointer'
				}}
			>
			</a> */}
		</div>
	);
};

export default Hero;
