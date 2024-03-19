-- CreateTable
CREATE TABLE "Pricing" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "amountAirportFees" DOUBLE PRECISION NOT NULL,
    "amountPerHour" DOUBLE PRECISION NOT NULL,
    "amountPerKm" DOUBLE PRECISION NOT NULL,
    "baseAmount" DOUBLE PRECISION NOT NULL,
    "baseKm" DOUBLE PRECISION NOT NULL,
    "cityFlag" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);
