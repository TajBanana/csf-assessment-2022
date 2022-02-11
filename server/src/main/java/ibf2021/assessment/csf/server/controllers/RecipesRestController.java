package ibf2021.assessment.csf.server.controllers;

/* Write your request handler in this file */

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipesRestController {

    @Autowired
    private RecipeService recipeSvc ;

    @GetMapping
    public ResponseEntity<String> getAllRecipes() {
        List<Recipe> recipeList = recipeSvc.getAllRecipes();
        System.out.println(recipeList);

        JsonObjectBuilder recipeObjectBuilder = Json.createObjectBuilder();
        JsonArrayBuilder recipeArrayBuilder = Json.createArrayBuilder();

        for (Recipe recipe : recipeList) {

            recipeObjectBuilder = recipeObjectBuilder
                    .add("Id", recipe.getId())
                    .add("Title", recipe.getTitle());

            recipeArrayBuilder.add(recipeObjectBuilder);
        }

        System.out.println(recipeObjectBuilder.build());

        JsonArray recipeArray = recipeArrayBuilder.build();
        System.out.println(recipeArray);


        return ResponseEntity.ok(recipeArray.toString());
    }
}