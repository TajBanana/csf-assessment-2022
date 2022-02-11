package ibf2021.assessment.csf.server.controllers;

/* Write your request handler in this file */

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "/recipe", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipeRestController {

    @Autowired
    private RecipeService recipeSvc ;

    @GetMapping(path = "{recipeId}")
    public ResponseEntity<String> getRecipeById(@PathVariable String recipeId) {
        Optional<Recipe> recipeOptional = recipeSvc.getRecipeById(recipeId);

        Recipe recipeDetails;

        if (recipeOptional.isPresent()) {
            recipeDetails = recipeOptional.get();
            System.out.println(">>>> Title: " + recipeDetails.getTitle());
            System.out.println(">>>> Image: " + recipeDetails.getImage());
            System.out.println(">>>> Instruction: " + recipeDetails.getInstruction());
            System.out.println(">>>> Ingredients: " + recipeDetails.getIngredients());

            System.out.println(recipeDetails.getIngredients());

            JsonArrayBuilder ingredientsJsonBuilder = Json.createArrayBuilder();

            for (String ingredient : recipeDetails.getIngredients()) {
                ingredientsJsonBuilder.add(ingredient);
            }

            JsonObject recipeReturn = Json.createObjectBuilder()
                    .add("Title", recipeDetails.getTitle())
                    .add("Image",recipeDetails.getImage())
                    .add("Instruction", recipeDetails.getInstruction() )
                    .add("Ingredients",ingredientsJsonBuilder)
                    .build();

            System.out.println(recipeReturn);
            return ResponseEntity.ok(recipeReturn.toString());

        }

        JsonObject badRequestJson = Json.createObjectBuilder()
                .add("error 404", "bad request")
                .build();

        return ResponseEntity.badRequest().build();


   /*     for (Recipe recipe : recipeList) {

            recipeObjectBuilder = recipeObjectBuilder
                    .add("Id", recipe.getId())
                    .add("Title", recipe.getTitle());

            recipeArrayBuilder.add(recipeObjectBuilder);
        }

        System.out.println(recipeObjectBuilder.build());

        JsonArray recipeArray = recipeArrayBuilder.build();
        System.out.println(recipeArray);


        return ResponseEntity.ok(recipeArray.toString());*/
    }
}