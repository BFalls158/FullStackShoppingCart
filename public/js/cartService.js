var app = angular.module("shoppingCart");
app.service("cartService", function($http) {

    // Call the Node Server API to get all the items. Return a promise that
    // resolves to an array of products. (The promise should NOT resolve to the
    // entire response object.)
    this.getAllItems = function() {
        // GET /api/items
        return $http.get("/api/items").then(function(response) {
            return response.data;
        })
        // TODO Make the HTTP request to the server and return a promise.
    };

    // Call the Node Server API to add an item.
    // The item parameter will be an object, for example:
    // { product: "Apples", price: 1.89 }
    // Return a promise that resolves when the request finishes. It doesn't
    // matter what the value of the promise is.
    this.addItem = function(item) {
        // POST /api/items
        // body -> { product: "...", price: ... }
        return $http({
            method: "POST",
            url: "/api/items",
            data: item
        }).then(function(response) {
            console.log(response);
            return response.data;
        }).catch(function(error){
            console.log(error);
        });
        // TODO Make the HTTP request to the server and return a promise.
    };

    // Call the Node Server API to delete an item.
    // The itemId parameter will be the ID of the item to delete.
    // Return a promise that resolves when the request finishes. It doesn't
    // matter what the value of the promise is.
    this.deleteItem = function(itemId) {
        // DELETE /api/items/{ID}
        return $http({
            method: "DELETE",
            url: "/api/items/" + itemId,
        }).then(function(response) {
            return response;
        });
        // TODO Make the HTTP request to the server and return a promise.
    };

});
