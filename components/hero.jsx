"use client";
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const Hero = () => {
	return (
		<div 
			className="relative w-full h-[500px] bg-[url('/herobanner/banner2.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
		>
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/40 z-[1]" />
			
			{/* Hero Content */}
			<div className="relative z-[2] text-center text-white px-5">
				<h1 className="text-[3.5rem] font-bold mb-5 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] tracking-[2px]">
					StyleWays
				</h1>
				<p className="text-xl mb-8 [text-shadow:1px_1px_2px_rgba(0,0,0,0.8)] max-w-[600px] mx-auto">
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
				className="absolute top-0 left-0 w-full h-full z-[3] no-underline cursor-pointer"
			>
			</a> */}
		</div>
	);
};

export default Hero;
