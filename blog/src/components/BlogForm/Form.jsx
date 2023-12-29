import { useState } from "react";
import axiosClient from "../../axios-client";
import imageIcon from "../../images/picture.svg";
import { MultiSelect } from "primereact/multiselect";
import LoginButton from "../Home/LoginButton";
import Input from "./Input";
import ListItem from "./ListItem";
import infoIcon from "../../images/red-info.svg"

export default function Form({ categories, setIsBlogPosted }) {
  const [image, setImage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(JSON.parse(localStorage.getItem("CATEGORIES_INPUT")) ?? []);
  const [author, setAuthor] = useState(JSON.parse(localStorage.getItem("AUTHOR_INPUT")) ?? "");
  const [title, setTitle] = useState(JSON.parse(localStorage.getItem("TITLE_INPUT")) ?? "");
  const [description, setDescription] = useState(JSON.parse(localStorage.getItem("DESCRIPTION_INPUT")) ?? "");
  const [date, setDate] = useState(JSON.parse(localStorage.getItem("DATE_INPUT")) ?? "");
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("EMAIL_INPUT")) ?? "");
  ////////// ALL VALIDATIONS
  // PATTERNS
  const georgianPattern = /^[\u10D0-\u10F1\s]+$/;
  // AUTHOR VALIDATIONS
  const isAuthorSizeValid = author.length >= 4;
  const isGeorgianAlphabet = author.match(georgianPattern);
  const authorWords = author.trim().split(" ");
  const isTwoWords = authorWords.length >= 2
  const isAuthorValid = isAuthorSizeValid && isGeorgianAlphabet && isTwoWords;
  // TITLE VALIDATIONS
  const isTitleTwoSymbols = title.length >= 2;
  // DESCRIPTION VALIDATIONS
  const validStyling = {
    border: "1px solid #14D81C",
    backgroundColor: "#F8FFF8",
  };
  const inValidStyling = {
    border: "1px solid #EA1919",
    backgroundColor: "#FAF2F3",
  };
  const isDescriptionFourSymbols = description.length >= 4;
  // EMAIL VALIDATIONS
  const emailRegex = /^[^\s@]+@redberry\.ge$/i;
  const isValidEmail = !email || email.match(emailRegex);

  // CATEGORY VALIDATIONS
  const isCategoriesValid = selectedCategories.length > 0;
  // FORM VALIDATIONS
  const isFormValid =
    isAuthorValid &&
    isTitleTwoSymbols &&
    isDescriptionFourSymbols &&
    isValidEmail &&
    isCategoriesValid &&
    image;

  ///////// END OF VALIDATIONS
  function handleForm(e) {
    e.preventDefault();
    if (!isFormValid) return;

    const formData = new FormData();
    const categoriesArray = Array.isArray(selectedCategories)
        ? selectedCategories
        : [selectedCategories];
    categoriesArray.forEach((category) => {
      formData.append("categories[]", category);
    });

    formData.append("image", image);
    formData.append("author", author);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("publish_date", date);
    formData.append("email", email);

    axiosClient
        .post("/blogs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setIsBlogPosted(true);
          clearInputs();
        })
        .catch((error) => console.error("Error uploading blog:", error));
  }
  function handleRemoveItem(id) {
    setSelectedCategories((selectedCategories) =>
        selectedCategories.filter((c) => c !== id),
    );
  }
  function selectedItemTemplate(option) {
    if (!option) return;
    const category = categories.find((c) => c.id === option);

    function handleClick(e, id) {
      e.stopPropagation();

      handleRemoveItem(id);
    }

    return (
        <button
            className="selected-item"
            style={{
              color: category.text_color,
              backgroundColor: category.background_color,
              fontWeight: "500",
            }}
        >
          <div>
            <span>{category.title}</span>
            <span onClick={(e) => handleClick(e, option)}>x</span>
          </div>
        </button>
    );
  }

  function clearInputs() {
    setImage("");
    setAuthor("");
    setTitle("");
    setEmail("");
    setSelectedCategories([]);
    setDate("");
    setDescription("");
    localStorage.removeItem("AUTHOR_INPUT");
    localStorage.removeItem("TITLE_INPUT");
    localStorage.removeItem("EMAIL_INPUT");
    localStorage.removeItem("CATEGORIES_INPUT");
    localStorage.removeItem("DATE_INPUT");
    localStorage.removeItem("DESCRIPTION_INPUT");

  }


  return (
    <div className="form">
      <h1>ბლოგის დამატება</h1>
      <div className="form-contents">
        <div className="image-div">
          <p>ატვირთეთ ფოტო</p>
          {image && (
            <div className="uploaded-image">
              <div>
                <img src={imageIcon} alt="Image icon" />
                <p>{image.name}</p>
              </div>
              <span onClick={() => setImage(false)}>&times;</span>
            </div>
          )}
          {!image && (
            <div className="upload-image">
              <label className="image-input">
                <img
                  src={process.env.PUBLIC_URL + "/images/image.svg"}
                  alt="Image Icon"
                />
                <p>
                  {" "}
                  ჩააგდეთ ფაილი აქ ან <u>აირჩიეთ ფაილი</u>
                </p>
                <input
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  type="file"
                />
              </label>
            </div>
          )}
        </div>
        {/* Author Input */}
        <>
          <Input
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value.trimStart());
              localStorage.setItem("AUTHOR_INPUT", JSON.stringify(e.target.value.trimStart()));
            }}
            title="ავტორი"
            isRequired={true}
            isValid={author ? isAuthorValid : true}
            placeholder="შეიყვანეთ ავტორი"
          >
            <ListItem value={author} condition={isAuthorSizeValid}>
              მინიმუმ 4 სიმბოლო
            </ListItem>
            <ListItem value={author} condition={isTwoWords}>
              მინიმუმ 2 სიტყვა
            </ListItem>
            <ListItem value={author} condition={isGeorgianAlphabet}>
              მხოლოდ ქართული სიმბოლოები
            </ListItem>
          </Input>
        </>
        {/* Title Input */}
        <>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value.trimStart());
              localStorage.setItem("TITLE_INPUT", JSON.stringify(e.target.value.trimStart()));
            }}
            isValid={title ? isTitleTwoSymbols : true}
            title="სათაური"
            isRequired={true}
            placeholder="შეიყვანეთ ავტორი"
          >
            <ListItem value={title} condition={isTitleTwoSymbols}>
              მინიმუმ 2 სიმბოლო
            </ListItem>
          </Input>
        </>
        <div className="textarea-div">
          <p>აღწერა*</p>
          <textarea
            value={description}
            style={
              description
                ? isDescriptionFourSymbols
                  ? validStyling
                  : inValidStyling
                : {}
            }
            onChange={(e) => {
              setDescription(e.target.value.trimStart());
              localStorage.setItem("DESCRIPTION_INPUT", JSON.stringify(e.target.value.trimStart()));
            }}
            placeholder="შეიყვანეთ აღწერა"
          ></textarea>
          <ListItem value={description} condition={isDescriptionFourSymbols}>
            მინიმუმ 4 სიმბოლო
          </ListItem>
        </div>
        {/* Release date input */}
        <>
          <Input
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              localStorage.setItem("DATE_INPUT", JSON.stringify(e.target.value.trimStart()));
            }}
            isValid={date}
            type="date"
            className="input-margin"
            title="გამოქვეყნების თარიღი"
            isRequired={true}
            placeholder="შეიყვანეთ სათაური"
          />
        </>
        <div className="input-div input-margin">
          <p>კატეგორია*</p>
          <MultiSelect
            className={isCategoriesValid ? "valid-input" : "default-input"}
            value={selectedCategories}
            onChange={(e) => {
              setSelectedCategories(e.value)
              localStorage.setItem("CATEGORIES_INPUT", JSON.stringify(e.value));
            }}
            placeholder="აირჩიეთ კატეგორია"
            options={categories}
            selectedItemTemplate={selectedItemTemplate}
            optionLabel="title"
            optionValue="id"
          />
        </div>
        {/* Multiselect category Input */}
        <div>
          <Input
            title="ელ-ფოსტა"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              localStorage.setItem("EMAIL_INPUT", JSON.stringify(e.target.value));
            }}
            isValid={isValidEmail}
            type="email"
            placeholder="Example@redberry.ge"
          />
          {
            !isValidEmail && (
                  <div className="email-error">
                    <img src={infoIcon} alt="Info icon"/>
                    <p>მეილი უნდა მთავრდებოდეს @redberry.ge-ით</p>
                  </div>
              )
          }
        </div>
      </div>
      <div className="btn-wrapper">
        <LoginButton onClick={handleForm} isDisabled={!isFormValid}>
          გამოქვეყნება
        </LoginButton>
      </div>
    </div>
  );
}
