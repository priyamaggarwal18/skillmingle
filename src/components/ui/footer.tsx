import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="flex flex-col rounded-tl-2xl rounded-tr-2xl items-center justify-center border-t border-border pb-5 w-full mx-auto pt-10">
            <div className="grid gap-8 xl:grid-cols-4 xl:gap-8 w-full text-center xl:text-left px-20">

                {/* Column 1: Logo and Description */}
                <div className="flex flex-col items-center justify-center md:max-w-[200px] space-y-4">
                    <div className="flex items-center justify-center">
                        <span className="text-white text-lg font-bold">Logo space</span>
                    </div>
                    <span className="text-neutral-200 text-sm flex items-center justify-center">
                        Powered By SkillMingle
                    </span>
                </div>

                {/* Column 2: Product Links */}
                <div className="flex flex-col items-center xl:items-start justify-start space-y-4">
                    <h3 className="text-base font-medium text-white">Product</h3>
                    <ul className="mt-4 text-sm text-muted-foreground space-y-2">
                        <li>
                            <Link href="" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                Testimonials
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                Integration
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Company Links */}
                <div className="flex flex-col items-center xl:items-start justify-start space-y-4">
                    <h3 className="text-base font-medium text-white">Company</h3>
                    <ul className="mt-4 text-sm text-muted-foreground space-y-2">
                        <li>
                            <Link href="" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                Terms & Conditions
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Contact Us Links */}
                <div className="flex flex-col items-center xl:items-start justify-start space-y-4"> 
                    <h3 className="text-base font-medium text-white">Contact Us</h3>
                    <ul className="mt-4 text-sm text-muted-foreground space-y-2">
                        <li>
                            <Link href="#" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                Email Us
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                Support
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-foreground hover:underline transition-all duration-300 no-underline">
                                Live Chat
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Copyright Section */}
            <div className="mt-8 border-t border-border/40 pt-4 md:pt-8 flex items-center justify-center w-full"> 
                <p className="text-sm text-muted-foreground mt-8 md:mt-0">
                    &copy; 2024 IEEE CIET All rights reserved.
                </p>
            </div>

        </footer>
    );
}

export default Footer;