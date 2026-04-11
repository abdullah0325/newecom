import Link from "next/link";

export default function HowToUsePage() {
    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">User Guide</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        How to Use Himalayan Salt
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        From the kitchen to the spa, discover the versatile uses of our premium salt products.
                    </p>
                </div>

                <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                    {/* Lamps */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-foreground">Salt Lamps</h3>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                                <strong>Placement:</strong> Place your lamp in bedrooms, living rooms, or offices where you spend the most time. Avoid damp areas like bathrooms unless it's a specific dry area.
                                <br /><br />
                                <strong>Care:</strong> Leave the lamp on as much as possible to generate heat, which prevents moisture buildup. If it "sweats", wipe with a dry cloth.
                            </p>
                        </div>
                        <div className="aspect-video rounded-xl bg-orange-100/50 flex items-center justify-center border border-orange-200">
                            <span className="text-orange-800 font-medium">Image: Salt Lamp in Living Room</span>
                        </div>
                    </section>

                    {/* Edible */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:grid-flow-row-dense">
                        <div className="lg:col-start-2">
                            <h3 className="text-2xl font-bold tracking-tight text-foreground">Edible Salt (Fine & Coarse)</h3>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                                <strong>Cooking:</strong> Use fine grain for everyday cooking and baking just like table salt, but use slightly less due to its potency.
                                <br /><br />
                                <strong>Finishing:</strong> Use coarse grain in a grinder for a fresh burst of flavor and texture on salads, steaks, and grilled vegetables.
                            </p>
                        </div>
                        <div className="lg:col-start-1 aspect-video rounded-xl bg-pink-100/50 flex items-center justify-center border border-pink-200">
                            <span className="text-pink-800 font-medium">Image: Salt Grinder & Cooking</span>
                        </div>
                    </section>

                    {/* Bath */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-foreground">Bath & Spa</h3>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                                <strong>Detox Bath:</strong> Add 1-2 cups of crystal salt to a warm bath. Soak for 20-30 minutes to help relax muscles and detoxify skin.
                                <br /><br />
                                <strong>Foot Soak:</strong> Dissolve 1/2 cup in a foot basin for tired feet relief.
                            </p>
                        </div>
                        <div className="aspect-video rounded-xl bg-purple-100/50 flex items-center justify-center border border-purple-200">
                            <span className="text-purple-800 font-medium">Image: Relaxing Bath Soak</span>
                        </div>
                    </section>
                </div>

                <div className="mt-16 text-center">
                    <Link href="/products" className="text-sm font-semibold leading-6 text-primary">
                        Explore our products <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

