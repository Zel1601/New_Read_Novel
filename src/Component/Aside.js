import React, { useState, useEffect } from "react";
import "./Css/Aside.css";

const Aside = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách thể loại:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container_aside">
        <div className="section-wrapper1">
          <section>
            <h2>Truyện tiểu thuyết</h2>
            <p className="p">
              Truyện tiểu thuyết là một dạng hình văn học dài, tập trung vào
              việc xây dựng một câu chuyện sự kiện và phát triển các nhân vật
              qua các tình huống và mối quan hệ phức tạp. Thể loại truyện tiểu
              thuyết đa dạng và có thể bao gồm những yếu tố sau:
            </p>
            <p className="p">
              1 .Tiểu thuyết hài hước: Tập trung vào các yếu tố hài hước, đem
              lại tiếng cười cho độc giả thông qua các tình huống, đối thoại và
              nhân vật hài hước.
            </p>
            <p className="p">
              2. Tiểu thuyết tội phạm: Truyện xoay quanh các hoạt động tội phạm,
              thám tử hoặc cảnh sát trong việc điều tra, tiếp cận và phá giải
              các vụ án.
            </p>
            <p className="p">
              3. Tiểu thuyết kinh dị: Tạo ra cảm giác sợ hãi và kinh hoàng thông
              qua các yếu tố ma quái, siêu nhiên hoặc tâm lý tâm linh.
            </p>
            <p className="p">
              5. Tiểu thuyết lãng mạn: Tập trung vào mối quan hệ tình yêu, tình
              cảm, tình huống tình yêu và sự phát triển của nhân vật trong mối
              quan hệ này.
            </p>
            <p className="p">
              6. Tiểu thuyết lịch sử: Tường thuật các sự kiện lịch sử, giai đoạn
              quan trọng hoặc cuộc đời của nhân vật lịch sử.
            </p>
            <p className="p">
              7. Tiểu thuyết phiêu lưu: Mang đến những cuộc phiêu lưu mạo hiểm,
              thường đi kèm với những thử thách và khám phá thế giới mới.
            </p>
            <p className="p">
              8. Tiểu thuyết khoa học: Tựa vào các yếu tố khoa học, công nghệ và
              tiến bộ trong lĩnh vực khoa học để xây dựng câu chuyện và thế giới
              hư cấu.
            </p>
          </section>
        </div>
        <div className="section-wrapper2">
          <section>
            <h2>Danh sách thể loại</h2>
            <ul>
            {categories.map((category) => (
              <li className="li_item" key={category.id}>{category.name}</li>
            ))}
          </ul>
          </section>
        </div>
      </div>
  );
};

export default Aside;
