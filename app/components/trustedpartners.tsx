import Image from "next/image";

export default function TrustedPartners () {
    return (
        <div className="flex-row justify-center gap-5 my-10 mx-5 lg:flex-justify-between">
            <h1 className="font-bold text-3xl text-center">Our Trusted Partners:</h1>
            <div className="flex justify-center gap-5 mx-auto mt-5"> 
                <Image src="/Ricoh_logo_2012.svg" width={150} height={150} alt="Ricoh"/>
                <Image src="/images/3drens.png" width={150} height={150} alt="3drens"/>
            </div>
           
        </div>
    )
}