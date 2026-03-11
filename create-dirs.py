import os

dirs = [
    "src/app/search",
    "src/app/categories",
    "src/app/dubai/theme-parks",
    "src/app/dubai/water-parks",
    "src/app/dubai/attractions",
    "src/app/dubai/water-sports",
    "src/app/dubai/water-adventures",
    "src/app/dubai/dinner-cruise",
    "src/app/dubai/yacht",
    "src/app/dubai/limousine",
    "src/app/dubai/desert-safari",
    "src/app/dubai/city-tours",
    "src/app/dubai/sky-adventures",
    "src/app/dubai/visa",
    "src/app/dubai/transfers",
    "src/app/dubai/supercars",
    "src/app/dubai/packages",
    "src/app/dubai/hotels",
    "src/app/dubai/car-rental",
    "src/app/dubai/adventures",
    "src/app/dubai/restaurants",
    "src/app/dubai/shows",
    "src/app/abu-dhabi",
    "src/app/sharjah",
    "src/app/ras-al-khaimah",
    "src/app/ajman",
    "src/app/experiences/[destination]/[category]/[slug]",
]

for d in dirs:
    os.makedirs(d, exist_ok=True)
    print(f"Created: {d}")

print("\nAll directories created! You can now delete this file.")
