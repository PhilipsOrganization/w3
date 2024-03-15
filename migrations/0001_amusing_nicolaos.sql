ALTER TABLE "ingredients_to_recipes" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE "recipes" ALTER COLUMN "total_time" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "cuisines" json NOT NULL;