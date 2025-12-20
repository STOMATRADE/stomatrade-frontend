export default function DashboardPage() {
    return (
        <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <section className="flex flex-col items-start pt-[80px] sm:pt-[120px] md:pt-[161px] pb-[40px] sm:pb-[60px] md:pb-[96px]">
                <div className="bg-[#4ade8026] border border-[#4ade80] rounded-2xl px-4 py-2 mb-4 sm:mb-6 md:mb-[16px]">
                    <span className="text-xs sm:text-sm md:text-xs font-semibold leading-lg text-[#b4b4b4]">
                        Admin
                    </span>
                </div>
                <h1 className="text-[28px] sm:text-[35px] md:text-[50px] font-medium leading-[28px] sm:leading-[35px] md:leading-[50px] text-text-primary mb-3 sm:mb-4 md:mb-[12px]">
                    Dashboard Overview
                </h1>
                <p className="text-base sm:text-lg md:text-2xl font-normal leading-[20px] sm:leading-[22px] md:leading-[25px] text-text-placeholder max-w-2xl">
                    Ringkasan singkat aktivitas platform untuk admin.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-4 pb-16 sm:pb-20 md:pb-24">
                <div className="bg-primary-elevated rounded-lg p-6 sm:p-8">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Total Users
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">12,540</p>
                </div>
                <div className="bg-primary-elevated rounded-lg p-6 sm:p-8">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Active Projects
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">48</p>
                </div>
                <div className="bg-primary-elevated rounded-lg p-6 sm:p-8">
                    <p className="text-sm sm:text-base font-medium leading-2xl text-text-placeholder mb-3">
                        Farmer Partners
                    </p>
                    <p className="text-text-primary text-2xl font-semibold">320</p>
                </div>
            </section>
        </main>
    );
}
