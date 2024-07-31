package ukgo.shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ukgo.shop.entity.ShopItem;
import ukgo.shop.repository.ItemRepository;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/items")
public class ShopController {

    @Autowired
    private ItemRepository itemRepository;

    private static final String UPLOAD_DIR = "C:/shopupload/";

    @PostMapping
    public ResponseEntity<ShopItem> addItem(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("price") Integer price,
            @RequestParam("description") String description) {

        String filePath = null;
        if (file != null && !file.isEmpty()) {
            try {
                filePath = saveFile(file);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        ShopItem shopItem = new ShopItem();
        shopItem.setTitle(title);
        shopItem.setPrice(price);
        shopItem.setDescription(description);
        shopItem.setFilePath(filePath);

        ShopItem savedShopItem = itemRepository.save(shopItem);
        return new ResponseEntity<>(savedShopItem, HttpStatus.CREATED);
    }

    private String saveFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs(); // 디렉토리가 존재하지 않으면 생성
        }
        File dest = new File(uploadDir, fileName);
        file.transferTo(dest);
        return "uploads/" + fileName; // 상대 경로 반환
    }

    @GetMapping
    public ResponseEntity<List<ShopItem>> getAllItems() {
        List<ShopItem> shopItems = itemRepository.findAll();
        return new ResponseEntity<>(shopItems, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShopItem> getItemById(@PathVariable int id) {
        Optional<ShopItem> item = itemRepository.findById(id);
        return item.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShopItem> updateItem(
            @PathVariable int id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("price") Integer price,
            @RequestParam("description") String description) {

        if (!itemRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ShopItem shopItem = itemRepository.findById(id).orElse(null);
        if (shopItem == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        shopItem.setTitle(title);
        shopItem.setPrice(price);
        shopItem.setDescription(description);

        if (file != null && !file.isEmpty()) {
            try {
                String filePath = saveFile(file);
                shopItem.setFilePath(filePath);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        ShopItem updatedShopItem = itemRepository.save(shopItem);
        return new ResponseEntity<>(updatedShopItem, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable int id) {
        if (!itemRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        itemRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
