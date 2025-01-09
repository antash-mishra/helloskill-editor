import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
    return (
        <div className="flex w-full justify-between py-2 px-6">
            <h2 className="text-xl font-semibold">Editor</h2>
            <ThemeToggle />
        </div>
    );
};

export default Navbar;
