export default function FarmetPage() {
    return (
        <main className="w-full max-w-[1440px] mx-auto">
            <section className="flex flex-col items-start pt-10 sm:pt-12 md:pt-14 pb-10 sm:pb-12 md:pb-16">
                <div className="bg-[#4ade8026] border border-[#4ade80] rounded-2xl px-4 py-2 mb-4 sm:mb-6 md:mb-[16px]">
                    <span className="text-xs sm:text-sm md:text-xs font-semibold leading-lg text-[#b4b4b4]">
                        Admin
                    </span>
                </div>
                <h1 className="text-[28px] sm:text-[35px] md:text-[50px] font-medium leading-[28px] sm:leading-[35px] md:leading-[50px] text-text-primary mb-3 sm:mb-4 md:mb-[12px]">
                    Farmer Directory
                </h1>
                <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder max-w-2xl">
                    Data mitra petani, lokasi, dan status program.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-4 pb-16 sm:pb-20 md:pb-24">
                <div className="bg-primary-elevated rounded-lg p-6 sm:p-8">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-2">
                        Active Farmets
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">112</p>
                </div>
                <div className="bg-primary-elevated rounded-lg p-6 sm:p-8">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-2">
                        Regions
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">9</p>
                </div>
                <div className="bg-primary-elevated rounded-lg p-6 sm:p-8">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-2">
                        Programs
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">18</p>
                </div>
            </section>
        </main>
    );
}
