package ukgo.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ukgo.shop.entity.Comment;
import ukgo.shop.entity.ShopItem;
import ukgo.shop.entity.User;
import ukgo.shop.repository.CommentRepository;
import ukgo.shop.repository.ItemRepository;
import ukgo.shop.repository.UserRepository;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Comment> getCommentsByItemId(Integer itemId) {
        return commentRepository.findByItemId(itemId);
    }

    @Transactional
    public Comment createComment(Integer itemId, Long userId, String content) {
        ShopItem item = itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setItem(item);
        comment.setAuthor(user);

        return commentRepository.save(comment);
    }

    @Transactional
    public Comment updateComment(Integer commentId, String content) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setContent(content);
        return commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(Integer commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new RuntimeException("Comment not found");
        }
        commentRepository.deleteById(commentId);
    }
}
