import Image from "next/image";

export default function TrustedPartners () {
    return (
        <section className="w-full bg-gradient-to-br from-orange-100 via-orange-200 to-orange-100 py-20 px-6">
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4 sm:gap-6">
            <h1 className="font-bold text-2xl sm:text-3xl text-center w-full sm:w-auto px-4">Our Overseas Distributors:</h1>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 lg:gap-6 mx-auto mt-4 sm:mt-5 w-full lg:w-auto lg:mt-0 lg:justify-between items-center">
                 <div className="flex-shrink-0 flex items-center justify-center h-14 sm:h-16 lg:h-18">
                    <Image src="/images/3drens.png" width={200} height={80} alt="3drens" className="w-auto h-full object-contain"/>
                </div>
                
                <div className="flex-shrink-0 flex items-center justify-center h-14 sm:h-16 lg:h-18">
                    <Image src="/Ricoh_logo_2012.svg" width={25} height={20} alt="Ricoh" className="w-auto h-full object-contain"/>
                </div>
               
                <div className="flex-shrink-0 flex items-center justify-center h-14 sm:h-16 lg:h-18">
                    <Image src="/images/ziontech.png" width={120} height={56} alt="ziontech" className="w-auto h-full object-contain"/>
                </div>
            </div>
          </div>
        </section>
    )
}
