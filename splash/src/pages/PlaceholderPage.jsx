import BottomNav from "../components/home/BottomNav";

const PlaceholderPage = ({ title, active }) => (
    <main className="min-h-screen pb-24">
        <div className="mx-auto min-h-screen w-full max-w-120">
            <header className="border-b border-gray-100 px-5 py-4">
                <h1 className="text-xl font-semibold">{title}</h1>
            </header>
            <section className="px-5 py-10 text-center text-gray-500">
                <p>{title} page is coming soon.</p>
            </section>
            <BottomNav active={active}/>
        </div>
    </main>
);

export default PlaceholderPage;