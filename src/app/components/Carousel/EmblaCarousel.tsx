import React, { useEffect } from 'react'
import { EmblaEventType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
	NextButton,
	PrevButton,
	usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { Expedition } from '@/app/actions/GetExpeditions'
import Image from 'next/image'

type PropType = {
	options?: EmblaOptionsType
	selectedExpedition?: Expedition
	expeditions: Expedition[]
	setSelected: (e: Expedition) => void
}

const EmblaCarousel = (props: PropType) => {
	const { expeditions, selectedExpedition, setSelected, options } = props
	const [emblaRef, emblaApi] = useEmblaCarousel(options)

	useEffect(() => {
		const index = expeditions.findIndex((e) => e.name == selectedExpedition?.name);
		if (index < 0 || index >= expeditions.length) return;
		emblaApi?.scrollTo(index + 1)
	}, [selectedExpedition, expeditions.length])

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick
	} = usePrevNextButtons(emblaApi)

	const GetExpeditionSlides = () => {
		return (
			expeditions.map((exp, index) => (
				<div className="embla__slide" key={index + 1} onClick={() => { setSelected(exp); }}>
					<div className="embla__slide__number">
						<span>{index + 1}</span>
						<Image
							src={`/${exp.mapIcon}`}
							alt="mapImage"
							width={250}
							height={250}
						/>
					</div>
				</div>
			))
		)
	}

	const GetPaddingSlide = (index: number) => {
		return (
			<div className="embla__slide" key={index}>
				<div className="embla__slide__number">
				</div>
			</div>
		)
	}

	const GetSlides = () => {
		let slides = GetExpeditionSlides();
		slides.unshift(GetPaddingSlide(0));
		slides.push(GetPaddingSlide(100));
		return slides;
	}

	const GetSlideIndex = () => emblaApi?.selectedScrollSnap() || 0

	return (
		<div className="embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{GetSlides()}
				</div>
			</div>

			<div className="embla__controls">
				<div className="embla__buttons">
					<PrevButton onClick={() => {
						if (GetSlideIndex() <= 1) return;
						onPrevButtonClick();
						if (emblaApi && emblaApi.selectedScrollSnap()) {
							setSelected(expeditions[emblaApi.selectedScrollSnap() - 1])
						}
					}} disabled={prevBtnDisabled} />
					<NextButton onClick={() => {
						if (GetSlideIndex() >= expeditions.length) return;
						onNextButtonClick();
						if (emblaApi && emblaApi.selectedScrollSnap()) {
							setSelected(expeditions[emblaApi.selectedScrollSnap() - 1])
						}
					}} disabled={nextBtnDisabled} />
				</div>
			</div>
		</div>
	)
}

export default EmblaCarousel
