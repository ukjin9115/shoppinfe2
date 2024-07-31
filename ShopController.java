package ukgo.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ukgo.shop.entity.ShopItem;
import ukgo.shop.repository.ItemRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/items")
public class ShopController {

    @Autowired
    private ItemRepository itemRepository;

    // Create a new item
    @PostMapping
    public ResponseEntity<ShopItem> addItem(@RequestBody ShopItem shopItem) {
        ShopItem savedShopItem = itemRepository.save(shopItem);
        return new ResponseEntity<>(savedShopItem, HttpStatus.CREATED);
    }

    // Get all items
    @GetMapping
    public ResponseEntity<List<ShopItem>> getAllItems() {
        List<ShopItem> shopItems = itemRepository.findAll();
        return new ResponseEntity<>(shopItems, HttpStatus.OK);
    }

    // Get item by ID
    @GetMapping("/{id}")
    public ResponseEntity<ShopItem> getItemById(@PathVariable int id) {
        Optional<ShopItem> item = itemRepository.findById(id);
        return item.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update an existing item
    @PutMapping("/{id}")
    public ResponseEntity<ShopItem> updateItem(@PathVariable int id, @RequestBody ShopItem shopItem) {
        if (!itemRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        shopItem.setId(id);
        ShopItem updatedShopItem = itemRepository.save(shopItem);
        return new ResponseEntity<>(updatedShopItem, HttpStatus.OK);
    }

    // Delete an item by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable int id) {
        if (!itemRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        itemRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
