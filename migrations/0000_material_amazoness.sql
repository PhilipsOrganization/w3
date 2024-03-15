CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" char(24) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"type" text NOT NULL,
	"country" char(2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients_to_recipes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"ingredient_id" char(24) NOT NULL,
	"recipe_id" char(24) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" char(24) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"country" char(2) NOT NULL,
	"description" text NOT NULL,
	"headline" text NOT NULL,
	"difficulty" integer NOT NULL,
	"prep_time" text NOT NULL,
	"total_time" text NOT NULL,
	"image_path" text NOT NULL,
	"yields_json" json NOT NULL,
	"steps" text NOT NULL,
	"slug" text NOT NULL,
	"tags" json NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients_to_recipes" ADD CONSTRAINT "ingredients_to_recipes_ingredient_id_recipes_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients_to_recipes" ADD CONSTRAINT "ingredients_to_recipes_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
