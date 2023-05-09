import React, { Component } from "react";
import { connect } from "react-redux";
// import "./About.scss";
//FormattedMessage convert qua lai ngon ngu
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about">
          <div className="about-width">
            <div className="section-about-header">
              Truyền thông nói gì về GNHUST
            </div>
            <div className="section-about-content">
              <div className="section-about-content-left">
                <iframe
                  width="100%"
                  height="400px"
                  src="https://www.youtube.com/embed/-Pceu-ItEoc?list=RD-Pceu-ItEoc"
                  title='Chỉ Mình Anh Nhìn Thấy | Thái Đinh x @NamKunOfficial | Live (at "Hẹn Em Trong Ký Ức" Hà Nội)'
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="section-about-content-right">
                "Chỉ Mình Anh Nhìn Thấy" là một trong những sáng tác mới nhất
                của mình và Nam được chúng mình trình diễn trong hai đêm nhạc
                "Hẹn Em Trong Ký Ức" vào tháng 11 năm 2022. Bài hát là những nỗi
                niềm của một tình yêu ngủ quên trong tháng 9. Người ta vẫn nói
                rằng trong tình yêu, đôi mắt lứa đôi chỉ toàn nhìn thấy những
                màu hồng. Vậy nếu như "chỉ mình anh nhìn thấy" cuộc đời này ửng
                hồng, có lẽ tình yêu này là thứ đơn phương vô vọng nhất rồi.
                Cùng với "Chuyến Xe Tháng Giêng", đây sẽ là một ca khúc nữa mình
                ấp ủ đặt trong album phòng thu thứ hai hiện đang được sản xuất
                của mình. Hy vọng các bạn sẽ yêu mến ca khúc này và chờ đợi cho
                bản chính thức sẽ được phát hành vào tháng 9 năm nay.
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
