import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './CarouselArrowButtons'
import { Expedition } from '@/app/actions/GetExpeditions'
import Image from 'next/image'
import { useEffect } from 'react'

type PropType = {
    options?: EmblaOptionsType
    selectedExpedition?: Expedition
    expeditions: Expedition[]
    setSelected: (e: Expedition) => void
}

const DreamCarousel = (props: PropType) => {
    const { expeditions, selectedExpedition, setSelected, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const jumpTo = (index: number) => {
        emblaApi?.scrollTo(index + 1)
        setSelected(expeditions[index]);
    }

    const GetExpeditionSlides = () => {
        return (
            expeditions.map((exp, index) => (
                <div className="embla__slide" key={index} onClick={() => { jumpTo(index) }}>
                    <div className="embla__slide__number">
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
            <div className="embla__slide" style={{ border: 'none' }} key={index}>
            </div>
        )
    }

    const GetSlides = () => {
        const slides = GetExpeditionSlides();
        slides.unshift(GetPaddingSlide(-100));
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

export default DreamCarousel
