import Image from "next/image";

export default function TrustedPartners () {
    return (
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 my-8 sm:my-10 mx-4 sm:mx-5 lg:mx-auto lg:flex-row lg:justify-between lg:items-center lg:max-w-6xl">
            <h1 className="font-bold text-2xl sm:text-3xl text-center w-full sm:w-auto px-4">Our Trusted Partners:</h1>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 lg:gap-6 mx-auto mt-4 sm:mt-5 w-full lg:w-auto lg:mt-0 lg:justify-between">
                <div className="flex-shrink-0">
                    <Image src="/Ricoh_logo_2012.svg" width={120} height={120} alt="Ricoh" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain"/>
                </div>
                <div className="flex-shrink-0">
                    <Image src="/images/3drens.png" width={120} height={120} alt="3drens" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain"/>
                </div>
                <div className="flex-shrink-0">
                    <Image src="/images/ziontech.png" width={120} height={120} alt="ziontech" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain"/>
                </div>
            </div>
           
        </div>
    )
}