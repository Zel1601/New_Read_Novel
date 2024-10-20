import React from "react";
import "./Css/Rule.css"; // Thêm CSS để làm đẹp

const Rule = () => {
  return (
    <div className="rule-container">
      <h1>Hỏi Đáp Tác Giả</h1>

      <div className="rule-section">
        <h2>1. Đăng tác phẩm lên MangaToon/NovelToon cần điều kiện gì?</h2>
        <ul>
          <li>Tác phẩm nguyên tác, không được sao chép, đạo nhái.</li>
          <li>Không được đăng nội dung khiêu dâm, bạo lực, liên quan đến chính trị, tôn giáo, vi phạm thuần phong mỹ tục...</li>
        </ul>
      </div>

      <div className="rule-section">
        <h2>2. Làm sao để đăng tải tác phẩm lên app MangaToon/NovelToon?</h2>
        <ul>
          <li>Có thể đăng tải từ trang web: mangatoon.mobi, hoặc tải app MangaToon/NovelToon từ kho ứng dụng và đăng tải trực tiếp từ app.</li>
          <li><strong>MangaToon:</strong> Đăng nhập, bấm vào Tôi - Trở thành tác giả - bấm nút “+” ở góc dưới – chọn loại hình tiểu thuyết – điền thông tin tiểu thuyết – viết nội dung chương.</li>
          <li><strong>NovelToon:</strong> Bấm Gửi bản thảo – bấm nút “+” ở góc dưới – điền thông tin tiểu thuyết – viết nội dung chương.</li>
          <li><strong>Website:</strong> Bấm Đăng tác phẩm – bấm Tạo tác phẩm – thêm thông tin tiểu thuyết – viết nội dung.</li>
        </ul>
      </div>

      <div className="rule-section">
        <h2>3. Có phải viết hoàn trước mới được đăng?</h2>
        <p>Không, tác phẩm hoàn hay đang viết đều có thể đăng tải.</p>
      </div>

      <div className="rule-section">
        <h2>4. Tại sao tác phẩm đã thông qua kiểm duyệt nhưng tìm kiếm lại không có?</h2>
        <p>Bạn vui lòng đợi thêm một lát, từ lúc thông qua kiểm duyệt cho đến khi được up lên app cần một chút thời gian.</p>
      </div>

      <div className="rule-section">
        <h2>5. Thời gian kiểm duyệt là bao lâu?</h2>
        <p>Thời gian kiểm duyệt trung bình từ 1 đến 3 ngày.</p>
      </div>

      <div className="rule-section">
        <h2>6. Tại sao phải có bước kiểm duyệt tác phẩm?</h2>
        <p>Để loại bỏ các tác phẩm không phù hợp với quy định đăng tải của MangaToon/NovelToon.</p>
      </div>

      <div className="rule-section">
        <h2>7. Ngày cập nhật nghĩa là sao?</h2>
        <p>Bạn có thể lưu thành bản nháp, rồi cài đặt xem ngày nào chương được đăng lên. Cần lưu ý: chương này không được cài ngày ra trước chương trước, và không được muộn hơn chương sau. Nếu bạn cài sai, thì chương đó sẽ không thể được đăng lên.</p>
      </div>

      <div className="rule-section">
        <h2>8. Thiết lập FULL cho tiểu thuyết bằng cách nào?</h2>
        <ul>
          <li><strong>Trên App:</strong> Bấm vào bộ truyện cần cài đặt - bấm Sửa – trượt nút bật Full.</li>
          <li><strong>Trên website:</strong> Bấm vào bộ truyện cần cài đặt – ở dưới ảnh bìa bấm Sửa tiểu thuyết – Tình trạng cập nhật chọn sang Đã Full.</li>
        </ul>
      </div>

      <div className="rule-section">
        <h2>9. Các chương đã đăng có sửa được nội dung không?</h2>
        <p>Bạn hoàn toàn có thể sửa nội dung chương đã đăng trên Bản thảo của mình.</p>
      </div>

      <div className="rule-section">
        <h2>10. Có nhất định phải có ảnh bìa không?</h2>
        <p>Không nhất thiết. MangaToon/NovelToon có kho ảnh bìa mặc định có thể tự động thêm vào tác phẩm của bạn. Tuy nhiên chúng tôi khuyến khích bạn tự chuẩn bị ảnh bìa. Bạn là tác giả, sẽ hiểu nội dung tiểu thuyết hơn và sẽ lựa chọn được ảnh bìa phù hợp hơn.</p>
      </div>

      <div className="rule-section">
        <h2>11. Kích cỡ ảnh bìa là bao nhiêu?</h2>
        <p>450 x 600 pixel.</p>
      </div>

      <div className="rule-section">
        <h2>12. Tại sao không thể tải lên ảnh bìa?</h2>
        <p>Có thể là do mạng không tốt, bạn có thể thử lại vài lần. Hoặc nếu cần hỗ trợ thêm, liên hệ facebook: NovelToon_VI.</p>
      </div>

      <div className="rule-section">
        <h2>13. Muốn đổi tên tác giả?</h2>
        <p>Rất tiếc, hiện tại MangaToon/NovelToon không hỗ trợ thay đổi tên tác giả.</p>
      </div>

      <div className="rule-section">
        <h2>14. Khi đăng nhập vào MangaToon/NovelToon (app hoặc website) lại xuất hiện 2 tài khoản phải làm sao?</h2>
        <p>Trước hết bạn phải xác nhận lại xem 2 tài khoản đó có đúng là được đăng nhập bằng cùng một phương thức đăng nhập hay không (đăng nhập bằng cùng 1 tài khoản Google, Facebook...). Nếu vẫn xuất hiện 2 tài khoản, vui lòng liên hệ facebook: NovelToon_VI để được giải quyết.</p>
      </div>

      <div className="rule-section">
        <h2>15. Người khác có thể copy nội dung tác phẩm của tôi không?</h2>
        <p>MangaToon/NovelToon sẽ bảo vệ nghiêm ngặt bản quyền của tác giả. Chúng tôi sẽ cố gắng hết sức để ngăn chặn tác phẩm của bạn bị sao chép. Một trong số các phương pháp, đó là không ai ngoài bạn ra có thể copy paste nội dung tác phẩm của bạn.</p>
      </div>
    </div>
  );
};

export default Rule;
