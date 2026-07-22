import type { Question } from "@/lib/types";

const dog = (label: string, value: number, detail?: string) => ({ label, value, image: "🐶", kind: "dog" as const, detail });
const cat = (label: string, value: number, detail?: string) => ({ label, value, image: "🐱", kind: "cat" as const, detail });
const pet = (label: string, value: number, image: string, detail?: string) => ({ label, value, image, kind: "species" as const, detail });
const country = (label: string, value: number, image: string, detail?: string) => ({ label, value, image, kind: "country" as const, detail });

export const questions: Question[] = [
  {
    id: "n1", round: "names", roundTitle: "Dog Names", eyebrow: "🇺🇸 AKC • FEMALE NAMES • 2025",
    prompt: "Which dog name ranked higher?", metric: "rank", left: dog("Luna", 1), right: dog("Sadie", 10),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/expert-advice/lifestyle/most-popular-dog-names/", sourceYear: "2025", scope: "AKC registrations and Canine Partners enrollments", fact: "Luna was the highest-ranked female dog name in AKC's 2025 list.", difficulty: "Easy"
  },
  {
    id: "n2", round: "names", roundTitle: "Dog Names", eyebrow: "🇺🇸 AKC • MALE NAMES • 2025",
    prompt: "Which dog name ranked higher?", metric: "rank", left: dog("Max", 1), right: dog("Finn", 10),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/expert-advice/lifestyle/most-popular-dog-names/", sourceYear: "2025", scope: "AKC registrations and Canine Partners enrollments", fact: "Max returned to the top of AKC's male dog-name rankings.", difficulty: "Easy"
  },
  {
    id: "n3", round: "names", roundTitle: "Dog Names", eyebrow: "🇺🇸 AKC • FEMALE NAMES • 2025",
    prompt: "Which dog name ranked higher?", metric: "rank", left: dog("Bella", 2), right: dog("Ruby", 5),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/expert-advice/lifestyle/most-popular-dog-names/", sourceYear: "2025", scope: "AKC registrations and Canine Partners enrollments", fact: "Bella remained near the very top of the female list.", difficulty: "Medium"
  },
  {
    id: "n4", round: "names", roundTitle: "Dog Names", eyebrow: "🇺🇸 AKC • MALE NAMES • 2025",
    prompt: "Which dog name ranked higher?", metric: "rank", left: dog("Hank", 2), right: dog("Gus", 5),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/expert-advice/lifestyle/most-popular-dog-names/", sourceYear: "2025", scope: "AKC registrations and Canine Partners enrollments", fact: "Short, human-style names dominate the current male list.", difficulty: "Medium"
  },
  {
    id: "n5", round: "names", roundTitle: "Dog Names", eyebrow: "🇺🇸 AKC • FEMALE NAMES • 2025",
    prompt: "Which dog name ranked higher?", metric: "rank", left: dog("Daisy", 3), right: dog("Willow", 6),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/expert-advice/lifestyle/most-popular-dog-names/", sourceYear: "2025", scope: "AKC registrations and Canine Partners enrollments", fact: "Nature-inspired names appear throughout the female top ten.", difficulty: "Medium"
  },
  {
    id: "n6", round: "names", roundTitle: "Dog Names", eyebrow: "🇺🇸 AKC • MALE NAMES • 2025",
    prompt: "Which dog name ranked higher?", metric: "rank", left: dog("Teddy", 3), right: dog("Bear", 6),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/expert-advice/lifestyle/most-popular-dog-names/", sourceYear: "2025", scope: "AKC registrations and Canine Partners enrollments", fact: "Teddy ranked three places above Bear in the 2025 list.", difficulty: "Medium"
  },
  {
    id: "n7", round: "names", roundTitle: "Dog Names", eyebrow: "🇺🇸 AKC • FEMALE NAMES • 2025",
    prompt: "Which dog name ranked higher?", metric: "rank", left: dog("Lucy", 4), right: dog("Maggie", 7),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/expert-advice/lifestyle/most-popular-dog-names/", sourceYear: "2025", scope: "AKC registrations and Canine Partners enrollments", fact: "Lucy held the fourth position among female names.", difficulty: "Medium"
  },
  {
    id: "n8", round: "names", roundTitle: "Dog Names", eyebrow: "🇺🇸 AKC • MALE NAMES • 2025",
    prompt: "Which dog name ranked higher?", metric: "rank", left: dog("Cooper", 4), right: dog("Duke", 7),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/expert-advice/lifestyle/most-popular-dog-names/", sourceYear: "2025", scope: "AKC registrations and Canine Partners enrollments", fact: "Cooper remained one of the most popular human-style dog names.", difficulty: "Medium"
  },
  {
    id: "n9", round: "names", roundTitle: "Dog Names", eyebrow: "🇺🇸 AKC • FEMALE NAMES • 2025",
    prompt: "Which dog name ranked higher?", metric: "rank", left: dog("Penny", 8), right: dog("Nova", 9),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/expert-advice/lifestyle/most-popular-dog-names/", sourceYear: "2025", scope: "AKC registrations and Canine Partners enrollments", fact: "Only one ranking place separated Penny and Nova.", difficulty: "Hard"
  },
  {
    id: "n10", round: "names", roundTitle: "Dog Names", eyebrow: "🇺🇸 AKC • MALE NAMES • 2025",
    prompt: "Which dog name ranked higher?", metric: "rank", left: dog("Maverick", 8), right: dog("Charlie", 9),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/expert-advice/lifestyle/most-popular-dog-names/", sourceYear: "2025", scope: "AKC registrations and Canine Partners enrollments", fact: "Maverick narrowly outranked Charlie.", difficulty: "Hard"
  },

  {
    id: "b1", round: "breeds", roundTitle: "Breeds", eyebrow: "🇺🇸 AKC DOG BREEDS • 2025",
    prompt: "Which breed ranked higher?", metric: "rank", left: dog("French Bulldog", 1), right: dog("Dachshund", 6),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/most-popular-breeds/", sourceYear: "2025", scope: "AKC registration rankings", fact: "The French Bulldog remained at the top of the AKC rankings.", difficulty: "Easy"
  },
  {
    id: "b2", round: "breeds", roundTitle: "Breeds", eyebrow: "🇺🇸 AKC DOG BREEDS • 2025",
    prompt: "Which breed ranked higher?", metric: "rank", left: dog("Labrador Retriever", 2), right: dog("Rottweiler", 8),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/most-popular-breeds/", sourceYear: "2025", scope: "AKC registration rankings", fact: "Labradors remain among America's most consistently popular registered breeds.", difficulty: "Easy"
  },
  {
    id: "b3", round: "breeds", roundTitle: "Breeds", eyebrow: "🇺🇸 AKC DOG BREEDS • 2025",
    prompt: "Which breed ranked higher?", metric: "rank", left: dog("Golden Retriever", 3), right: dog("Beagle", 7),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/most-popular-breeds/", sourceYear: "2025", scope: "AKC registration rankings", fact: "Golden Retrievers continue to rank near the very top.", difficulty: "Medium"
  },
  {
    id: "b4", round: "breeds", roundTitle: "Breeds", eyebrow: "🇺🇸 AKC DOG BREEDS • 2025",
    prompt: "Which breed ranked higher?", metric: "rank", left: dog("German Shepherd Dog", 4), right: dog("Bulldog", 9),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/most-popular-breeds/", sourceYear: "2025", scope: "AKC registration rankings", fact: "German Shepherd Dogs continue to place in the AKC top five.", difficulty: "Medium"
  },
  {
    id: "b5", round: "breeds", roundTitle: "Breeds", eyebrow: "🇺🇸 AKC DOG BREEDS • 2025",
    prompt: "Which breed ranked higher?", metric: "rank", left: dog("Poodle", 5), right: dog("German Shorthaired Pointer", 10),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/most-popular-breeds/", sourceYear: "2025", scope: "AKC registration rankings", fact: "Poodles rank as one breed regardless of size variety.", difficulty: "Medium"
  },
  {
    id: "b6", round: "breeds", roundTitle: "Breeds", eyebrow: "CFA PEDIGREED CAT BREEDS • 2025",
    prompt: "Which cat breed ranked higher?", metric: "rank", left: cat("Maine Coon", 2), right: cat("Sphynx", 8),
    sourceName: "Cat Fanciers' Association", sourceUrl: "https://cfa.org/cat-talk/most-popular-breeds-for-2026/", sourceYear: "2025 registrations", scope: "CFA pedigreed-cat registrations", fact: "Maine Coons remain one of the world's most popular pedigreed cats.", difficulty: "Easy"
  },
  {
    id: "b7", round: "breeds", roundTitle: "Breeds", eyebrow: "CFA PEDIGREED CAT BREEDS • 2025",
    prompt: "Which cat breed ranked higher?", metric: "rank", left: cat("Ragdoll", 1), right: cat("Bengal", 5),
    sourceName: "Cat Fanciers' Association", sourceUrl: "https://cfa.org/cat-talk/most-popular-breeds-for-2026/", sourceYear: "2025 registrations", scope: "CFA pedigreed-cat registrations", fact: "Ragdolls have repeatedly occupied the top position in recent CFA rankings.", difficulty: "Medium"
  },
  {
    id: "b8", round: "breeds", roundTitle: "Breeds", eyebrow: "CFA PEDIGREED CAT BREEDS • 2025",
    prompt: "Which cat breed ranked higher?", metric: "rank", left: cat("Persian", 4), right: cat("Siberian", 9),
    sourceName: "Cat Fanciers' Association", sourceUrl: "https://cfa.org/cat-talk/most-popular-breeds-for-2026/", sourceYear: "2025 registrations", scope: "CFA pedigreed-cat registrations", fact: "The Persian remains one of the best-known pedigreed cat breeds.", difficulty: "Medium"
  },
  {
    id: "b9", round: "breeds", roundTitle: "Breeds", eyebrow: "🇺🇸 AKC DOG BREEDS • 2025",
    prompt: "Which breed ranked higher?", metric: "rank", left: dog("Dachshund", 6), right: dog("Beagle", 7),
    sourceName: "American Kennel Club", sourceUrl: "https://www.akc.org/most-popular-breeds/", sourceYear: "2025", scope: "AKC registration rankings", fact: "Only one position separated these familiar hound breeds.", difficulty: "Hard"
  },
  {
    id: "b10", round: "breeds", roundTitle: "Breeds", eyebrow: "CFA PEDIGREED CAT BREEDS • 2025",
    prompt: "Which cat breed ranked higher?", metric: "rank", left: cat("British Shorthair", 3), right: cat("Persian", 4),
    sourceName: "Cat Fanciers' Association", sourceUrl: "https://cfa.org/cat-talk/most-popular-breeds-for-2026/", sourceYear: "2025 registrations", scope: "CFA pedigreed-cat registrations", fact: "These two breeds were separated by a single ranking place.", difficulty: "Hard"
  },

  {
    id: "o1", round: "ownership", roundTitle: "Companion Pets", eyebrow: "🇬🇧 UNITED KINGDOM • HOUSEHOLDS",
    prompt: "Which companion pet is owned by more households?", metric: "percent", left: pet("Rabbits", 2.4, "🐰"), right: pet("Snakes", 1.1, "🐍"),
    sourceName: "UK Pet Food", sourceUrl: "https://www.ukpetfood.org/industry-hub/data-statistics-/uk-pet-population-.html", sourceYear: "2026", scope: "Percentage of UK households", fact: "Rabbit-owning households outnumber snake-owning households in the UK survey.", difficulty: "Easy"
  },
  {
    id: "o2", round: "ownership", roundTitle: "Companion Pets", eyebrow: "🇦🇺 AUSTRALIA • HOUSEHOLDS",
    prompt: "Which companion-pet group is owned by more households?", metric: "percent", left: pet("Fish", 11.0, "🐠"), right: pet("Reptiles", 3.0, "🦎"),
    sourceName: "Animal Medicines Australia", sourceUrl: "https://animalmedicinesaustralia.org.au/resources/pets-in-australia-a-national-survey-of-pets-and-people-3/", sourceYear: "2025", scope: "Percentage of Australian households", fact: "Fish remain substantially more common than reptiles in Australian households.", difficulty: "Easy"
  },
  {
    id: "o3", round: "ownership", roundTitle: "Companion Pets", eyebrow: "🇬🇧 UNITED KINGDOM • HOUSEHOLDS",
    prompt: "Which companion pet is owned by more households?", metric: "percent", left: pet("Guinea pigs", 1.8, "🐹"), right: pet("Horses", 1.0, "🐴"),
    sourceName: "UK Pet Food", sourceUrl: "https://www.ukpetfood.org/industry-hub/data-statistics-/uk-pet-population-.html", sourceYear: "2026", scope: "Percentage of UK households", fact: "This game counts horses only where the survey classifies them as companion pets.", difficulty: "Medium"
  },
  {
    id: "o4", round: "ownership", roundTitle: "Companion Pets", eyebrow: "🇦🇺 AUSTRALIA • HOUSEHOLDS",
    prompt: "Which companion-pet group is owned by more households?", metric: "percent", left: pet("Birds", 10.0, "🦜"), right: pet("Small mammals", 6.0, "🐹"),
    sourceName: "Animal Medicines Australia", sourceUrl: "https://animalmedicinesaustralia.org.au/resources/pets-in-australia-a-national-survey-of-pets-and-people-3/", sourceYear: "2025", scope: "Percentage of Australian households", fact: "The Australian report groups rabbits, guinea pigs and similar pets as small mammals.", difficulty: "Medium"
  },
  {
    id: "o5", round: "ownership", roundTitle: "Companion Pets", eyebrow: "🐰 RABBIT OWNERSHIP • HOUSEHOLDS",
    prompt: "Where is rabbit ownership more common?", metric: "percent", left: country("United Kingdom", 2.4, "🇬🇧"), right: country("Canada", 1.5, "🇨🇦"),
    sourceName: "UK Pet Food / Canadian national survey", sourceUrl: "https://www.ukpetfood.org/industry-hub/data-statistics-/uk-pet-population-.html", sourceYear: "Latest available comparable figures", scope: "Share of households reporting rabbits", fact: "Country battles compare household ownership rates, never raw national totals.", difficulty: "Medium"
  },
  {
    id: "o6", round: "ownership", roundTitle: "Companion Pets", eyebrow: "🐦 BIRD OWNERSHIP • HOUSEHOLDS",
    prompt: "Where is bird ownership more common?", metric: "percent", left: country("Australia", 10.0, "🇦🇺"), right: country("United Kingdom", 2.5, "🇬🇧"),
    sourceName: "Animal Medicines Australia / UK Pet Food", sourceUrl: "https://animalmedicinesaustralia.org.au/resources/pets-in-australia-a-national-survey-of-pets-and-people-3/", sourceYear: "2025–2026", scope: "Share of households reporting companion birds", fact: "Australia reports a notably high household rate for companion birds.", difficulty: "Easy"
  },
  {
    id: "o7", round: "ownership", roundTitle: "Companion Pets", eyebrow: "🐠 FISH OWNERSHIP • HOUSEHOLDS",
    prompt: "Where is fish ownership more common?", metric: "percent", left: country("Australia", 11.0, "🇦🇺"), right: country("United Kingdom", 5.0, "🇬🇧"),
    sourceName: "Animal Medicines Australia / UK Pet Food", sourceUrl: "https://animalmedicinesaustralia.org.au/resources/pets-in-australia-a-national-survey-of-pets-and-people-3/", sourceYear: "2025–2026", scope: "Share of households reporting fish", fact: "The comparison uses household prevalence rather than the number of individual fish.", difficulty: "Medium"
  },
  {
    id: "o8", round: "ownership", roundTitle: "Companion Pets", eyebrow: "🦎 REPTILE OWNERSHIP • HOUSEHOLDS",
    prompt: "Where is reptile ownership more common?", metric: "percent", left: country("Australia", 3.0, "🇦🇺"), right: country("United Kingdom", 2.0, "🇬🇧"),
    sourceName: "Animal Medicines Australia / UK Pet Food", sourceUrl: "https://animalmedicinesaustralia.org.au/resources/pets-in-australia-a-national-survey-of-pets-and-people-3/", sourceYear: "2025–2026", scope: "Share of households reporting companion reptiles", fact: "Only surveys that identify reptiles as pets are used.", difficulty: "Hard"
  },
  {
    id: "o9", round: "ownership", roundTitle: "Companion Pets", eyebrow: "🇬🇧 UNITED KINGDOM • HOUSEHOLDS",
    prompt: "Which companion pet is owned by more households?", metric: "percent", left: pet("Turtles and tortoises", 1.3, "🐢"), right: pet("Snakes", 1.1, "🐍"),
    sourceName: "UK Pet Food", sourceUrl: "https://www.ukpetfood.org/industry-hub/data-statistics-/uk-pet-population-.html", sourceYear: "2026", scope: "Percentage of UK households", fact: "This is one of the closest ownership matchups in the prototype.", difficulty: "Hard"
  },
  {
    id: "o10", round: "ownership", roundTitle: "Companion Pets", eyebrow: "🐴 HORSE OWNERSHIP • HOUSEHOLDS",
    prompt: "Where is companion-horse ownership more common?", metric: "percent", left: country("United Kingdom", 1.0, "🇬🇧"), right: country("Canada", 0.8, "🇨🇦"),
    sourceName: "UK Pet Food / Canadian national survey", sourceUrl: "https://www.ukpetfood.org/industry-hub/data-statistics-/uk-pet-population-.html", sourceYear: "Latest available comparable figures", scope: "Share of households reporting horses as companion animals", fact: "Agricultural livestock is excluded; this question uses companion-animal survey responses.", difficulty: "Hard"
  }
];
