package ibf2021.assessment.csf.server.controllers;

/* Write your request handler in this file */

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    }

    @PostMapping
    public ResponseEntity<String> addRecipe() {

        //TODO PROCESS THE INPUT FROM CLIENT AND SAVE TO RECIPE DATABASE

        JsonObjectBuilder payload = Json.createObjectBuilder();
        payload.add("message", "Recipe saved");

        System.out.println(">>>> POST: GOT YOUR RECIPE");
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(payload.build().toString());
    }

}