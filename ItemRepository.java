package ukgo.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ukgo.shop.entity.ShopItem;

public interface ItemRepository extends JpaRepository<ShopItem, Integer> {

}
