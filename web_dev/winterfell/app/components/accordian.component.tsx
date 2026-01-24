"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const AccordionDemo = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const data = [
        { title: "What is Winterfell?", content: "Winterfell is an AI-powered platform for building, editing, deploying, and interacting with Rust-based smart contracts on Solana using Anchor. It simplifies the entire smart contract workflow from generation to frontend integration." },
        { title: "Do I need to know Rust to use this platform?", content: "No! Our AI can generate Anchor contracts from natural language descriptions. However, understanding Rust and Solana concepts will help you customize and optimize your contracts more effectively." },
        { title: "What types of contracts can I build?", content: "You can build various Solana programs including token contracts, NFT contracts, DeFi programs, escrow systems, and payment programs. We provide templates for common use cases and support custom contract generation." },
        { title: "Can I deploy to mainnet?", content: "Yes! Winterfell supports one-click deployment to Solana Devnet, Testnet, and Mainnet. We also provide CLI commands and track deployed program IDs for easy management." },
        { title: "Does it generate client code for my contract?", content: "Absolutely! The platform automatically generates TypeScript/JavaScript client SDKs with typed functions for each instruction, wallet integration, and helper functions for PDAs and transactions." },
        { title: "What about security?", content: "Our AI assistant warns about known vulnerabilities like unchecked seeds and missing payer checks. We also provide an AI-powered security checklist covering seeds, admin restrictions, and rent exemption checks." },
        { title: "How do I test my contracts?", content: "The platform auto-generates Anchor test scripts and allows you to simulate transactions in-browser or on devnet before deployment. You can also test frontend integrations with our interactive sandbox." }]
    return (
        <div className="mx-auto bg-orange-50 p-2">
            {data.map((item, index) => {
                const isOpen: boolean = activeIndex === index;

                return (
                    <div
                        key={index}

                        style={{
                            borderBottom: "1px solid gray",
                            padding: "16px 0",
                            width: "500px"
                        }}
                    >
                        <button
                            onClick={() =>
                                setActiveIndex(isOpen ? null : index)
                            }
                            className="flex w-full items-center justify-between font-medium text-left"
                        >
                            {item.title}
                            <motion.span
                                animate={{ rotate: isOpen ? 20 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-[34px] text-blue-500"
                            >
                                +
                            </motion.span>
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    style={{ overflow: "hidden" }}
                                >
                                    <p
                                        style={{
                                            marginTop: "10px",
                                            color: "#555",
                                            lineHeight: "1.6",
                                        }}
                                    >
                                        {item.content}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

export default AccordionDemo;
