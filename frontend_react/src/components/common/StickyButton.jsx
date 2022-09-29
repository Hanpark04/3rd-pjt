import React, { useState, useEffect } from "react";
import LiveHelpTwoToneIcon from "@mui/icons-material/LiveHelpTwoTone";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { getAccordClass } from "../../apis/perfume";
import navLogo from "@images/logo/logo.png";
// import book from "@images/icon/book.png";
import "./StickyButton.scss";

function StickyButton() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openBook, setOpenBook] = useState(false);
  const [openWord, setOpenWord] = useState(false);
  const [openScent, setOpenScent] = useState(false);
  const [noteBar, setNoteBar] = useState(false);
  const [perBar, setPerBar] = useState(false);
  const [extraBar, setExtraBar] = useState(false);
  const [accordClass, setAccordClass] = useState({});
  const getAccord = async () => {
    const res = await getAccordClass(3);
    setAccordClass(res.accordClass.classDescription);
  };
  useEffect(() => {
    getAccord();
  }, []);
  const openMenuOpt = () => {
    setOpenMenu(!openMenu);
    setOpenWord(false);
    setOpenScent(false);
  };
  const openBookOpt = () => {
    setOpenBook(!openBook);
    setOpenWord(false);
    setOpenScent(false);
  };
  const openWordOpt = () => {
    setOpenScent(false);
    setOpenWord(true);
  };
  const openScentOpt = () => {
    setOpenWord(false);
    setOpenScent(true);
  };
  const openNoteBar = () => {
    setPerBar(false);
    setExtraBar(false);
    setNoteBar(!noteBar);
  };
  const openPerBar = () => {
    setExtraBar(false);
    setNoteBar(false);
    setPerBar(!perBar);
  };
  const openExtraBar = () => {
    setPerBar(false);
    setNoteBar(false);
    setExtraBar(!extraBar);
  };
  return (
    <div className="float">
      <div className="sticky">
        {!openMenu && (
          <button className="sticky_btn" type="button" onClick={openMenuOpt}>
            <LiveHelpTwoToneIcon fontSize="large" />
          </button>
        )}
        {openMenu && (
          <div className="sticky_menuBar flex">
            <div className="sticky_menuBar_title flex">
              <img
                className="sticky_menuBar_title_img"
                title="!213"
                alt="logoImg"
                src={navLogo}
              />
              <button
                className="sticky_menuBar_title_btn"
                type="button"
                onClick={openMenuOpt}
              >
                <CloseRoundedIcon />
              </button>
            </div>
            <div className="sticky_menuBar_toBook flex">
              <button
                className="sticky_menuBar_toBook_btn"
                type="button"
                onClick={openBookOpt}
              >
                정보 알아보기
              </button>
            </div>
          </div>
        )}
      </div>
      {openBook && (
        <div className="book">
          {/* <img className="book_img" alt="rollImg" src={book} /> */}
          <div className="book_title flex">
            <div className="book_title_tag flex">
              <div className="book_title_tag_word">
                <button
                  className="book_title_tag_word_btn kyobo fs-32"
                  type="button"
                  onClick={openWordOpt}
                >
                  용어를 알아보자
                </button>
              </div>
              <div className="book_title_tag_scent">
                <button
                  className="book_title_tag_scent_btn kyobo fs-32"
                  type="button"
                  onClick={openScentOpt}
                >
                  향을 알아보자
                </button>
              </div>
            </div>
            <button
              className="book_title_btn"
              type="button"
              onClick={openBookOpt}
            >
              <CloseRoundedIcon fontSize="large" />
            </button>
          </div>
          <div className="book_content">
            {openWord && (
              <div className="book_content_word flex">
                <div className="book_content_word_tags flex">
                  <div className="book_content_word_tags_tag">
                    <button
                      className="book_content_word_tags_tag_note kyobo fs-24"
                      type="button"
                      onClick={openNoteBar}
                    >
                      노트
                    </button>
                  </div>
                  <div className="book_content_word_tags_tag">
                    <button
                      className="book_content_word_tags_tag_per kyobo fs-24"
                      type="button"
                      onClick={openPerBar}
                    >
                      원액 비율
                    </button>
                  </div>
                  <div className="book_content_word_tags_tag">
                    <button
                      className="book_content_word_tags_tag_extra kyobo fs-24"
                      type="button"
                      onClick={openExtraBar}
                    >
                      기타
                    </button>
                  </div>
                </div>
                {noteBar && (
                  <div className="book_content_word_contents kyobo fs-22 flex">
                    <div className="book_content_word_contents_box flex">
                      <div className="book_content_word_contents_box_terms">
                        노트 <br /> (Note)
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        시간에 따른 향의 변화로, 향수에는 다양한 화합물이
                        섞여있습니다. 그래서 이들 향이 각기 다르고 더욱 증발
                        속도가 다르기 때문에 향수를 뿌리면 시간대별로 다른 향이
                        나타나게 되는데 이를 ‘노트’라고 칭합니다.
                      </div>
                    </div>
                    <div className="book_content_word_contents_box flex">
                      <div className="book_content_word_contents_box_terms">
                        탑 노트
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        향수를 뿌린 이후 15분 정도 지속되는 향을 뜻합니다.
                        향수의 제일 첫 향이기 때문에 첫 인상을 결정하는데 중요한
                        부분으로 작용합니다.
                      </div>
                    </div>
                    <div className="book_content_word_contents_box flex">
                      <div className="book_content_word_contents_box_terms">
                        미들 노트
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        향수를 뿌리고 30분-1시간 지난 뒤 나는 향을 뜻합니다. 첫
                        향인 탑 노트가 사라지고 나서 나타나는 향이지만
                        지속시간은 탑 노트, 베이스 노트에 비해 짧습니다.
                      </div>
                    </div>
                    <div className="book_content_word_contents_box flex">
                      <div className="book_content_word_contents_box_terms">
                        베이스 노트
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        향수를 뿌리고 2-3시간 뒤 은은하게 나는 향으로, 제일 오래
                        남아있는 향이면서 그 향의 성격이나 품질 지속성에 가장
                        영향을 미치는 향이기도 합니다.
                      </div>
                    </div>
                  </div>
                )}
                {perBar && (
                  <div className="book_content_word_contents kyobo fs-22 flex">
                    <div className="book_content_word_contents_box flex">
                      <div className="book_content_word_contents_box_terms">
                        퍼퓸(Perfume)
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        원액의 농도가{" "}
                        <span style={{ color: "crimson" }}>15%~30%</span>이며
                        지속시간은{" "}
                        <span style={{ color: "navy" }}>7시간~12시간 정도</span>
                        입니다. <br /> 원액의 농도가 짙으며, 향이 가장 진합니다.
                      </div>
                    </div>
                    <div className="book_content_word_contents_box flex">
                      <div className="book_content_word_contents_box_terms">
                        오드 퍼퓸 <br /> (
                        <span style={{ color: "orangered" }}>EDP</span>)
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        원액의 농도가{" "}
                        <span style={{ color: "crimson" }}>8%~15%</span>이며
                        지속시간은{" "}
                        <span style={{ color: "darkblue" }}>
                          5시간~8시간 정도
                        </span>
                        입니다.
                        <br />
                        가장 풍부하고 꽉찬 향이라고 느껴집니다.
                      </div>
                    </div>
                    <div className="book_content_word_contents_box flex">
                      <div className="book_content_word_contents_box_terms">
                        오드 뚜왈렛 <br /> (
                        <span style={{ color: "orangered" }}>EDT</span>)
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        원액의 농도가{" "}
                        <span style={{ color: "crimson" }}>4%~8%</span>이며
                        지속시간은{" "}
                        <span style={{ color: "darkblue" }}>
                          3시간~6시간 정도
                        </span>
                        입니다. 오드 퍼퓸(EDP)보다는 덜 꽉찬 향이라고
                        느껴집니다.
                      </div>
                    </div>
                    <div className="book_content_word_contents_box flex">
                      <div className="book_content_word_contents_box_terms">
                        오드 코롱 <br /> (
                        <span style={{ color: "orangered" }}>EDC</span>)
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        원액의 농도가{" "}
                        <span style={{ color: "crimson" }}>3%~5%</span>이며
                        지속시간은{" "}
                        <span style={{ color: "darkblue" }}>
                          1시간~4시간 정도
                        </span>
                        입니다. <br />
                        EDP, EDT에 비해 상대적으로 가벼운 향수라고 느껴집니다.
                      </div>
                    </div>
                    <div className="book_content_word_contents_box flex">
                      <div className="book_content_word_contents_box_terms">
                        샤워코롱
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        원액의 농도가{" "}
                        <span style={{ color: "crimson" }}>1%~3%</span>로
                        지속시간은{" "}
                        <span style={{ color: "darkblue" }}>1시간 미만</span>
                        입니다. <br />
                        향수보다는 바디미스트라는 말이 더 잘 어울립니다.
                      </div>
                    </div>
                  </div>
                )}
                {extraBar && (
                  <div className="book_content_word_contents kyobo fs-22 flex">
                    <div className="book_content_word_contents_box flex">
                      <div className="book_content_word_contents_box_terms">
                        향수 용량
                        <br /> (fl.oz)
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        액체의 액량 단위 <br /> 30ml = 1 fl.oz <br /> 50ml = 1.7
                        fl.oz <br /> 100ml = 3.3 fl.oz <br /> 300ml = 10 fl.oz
                      </div>
                    </div>
                    <div className="book_content_word_contents_box flex">
                      <div
                        className="book_content_word_contents_box_terms"
                        style={{ color: "darkblue" }}
                      >
                        남성용
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        맨(Man or Men), 옴므(homme), 우모(Uomo), <br />
                        메일(Male)
                      </div>
                    </div>
                    <div className="book_content_word_contents_box flex">
                      <div
                        className="book_content_word_contents_box_terms"
                        style={{ color: "crimson" }}
                      >
                        여성용
                      </div>
                      <div className="book_content_word_contents_box_mean">
                        우먼(Women), 팜므(Famme), 엘르(Elle), 허(Her), <br />
                        돈나(Donna)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {openScent && (
              <div className="book_content_scent flex">
                <div className="book_content_scent_tags flex">
                  <div className="book_content_scent_tags_tag">
                    <button
                      className="book_content_scent_tags_tag_citrus kyobo fs-22"
                      type="button"
                    >
                      시트러스 <br /> (Citrus)
                    </button>
                  </div>
                  <div className="book_content_scent_tags_tag">
                    <button
                      className="book_content_scent_tags_tag_floral kyobo fs-22"
                      type="button"
                    >
                      플로럴 <br /> (Floral)
                    </button>
                  </div>
                  <div className="book_content_scent_tags_tag">
                    <button
                      className="book_content_scent_tags_tag_herbal kyobo fs-22"
                      type="button"
                    >
                      허브 <br /> (Herbal)
                    </button>
                  </div>
                  <div className="book_content_scent_tags_tag">
                    <button
                      className="book_content_scent_tags_tag_fruity kyobo fs-22"
                      type="button"
                    >
                      프루티 <br /> (Fruity)
                    </button>
                  </div>
                  <div className="book_content_scent_tags_tag">
                    <button
                      className="book_content_scent_tags_tag_spicy kyobo fs-22"
                      type="button"
                    >
                      스파이시 <br /> (Spicy)
                    </button>
                  </div>
                  <div className="book_content_scent_tags_tag">
                    <button
                      className="book_content_scent_tags_tag_animalic kyobo fs-22"
                      type="button"
                    >
                      애니멀릭 <br /> (Animalic)
                    </button>
                  </div>
                  <div className="book_content_scent_tags_tag">
                    <button
                      className="book_content_scent_tags_tag_synthetic kyobo fs-22"
                      type="button"
                    >
                      인조적인 <br /> (Synthetic)
                    </button>
                  </div>
                  <div className="book_content_scent_tags_tag">
                    <button
                      className="book_content_scent_tags_tag_sweet kyobo fs-22"
                      type="button"
                    >
                      스위트 <br /> (Sweet)
                    </button>
                  </div>
                </div>
                <div className="book_content_scent_contents flex">
                  <div className="book_content_word_contents_title kyobo fs-22">
                    {accordClass}
                  </div>
                  <div className="book_content_word_contents_box flex">
                    반복 <br />
                    반복 <br />
                    반복 <br />
                    반복 <br />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default StickyButton;