ALTER TABLE "ingredients_to_recipes" DROP CONSTRAINT "ingredients_to_recipes_ingredient_id_recipes_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients_to_recipes" ADD CONSTRAINT "ingredients_to_recipes_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
