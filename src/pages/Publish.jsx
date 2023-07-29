import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
window.addEventListener(
  "dragover",
  function (e) {
    e = e || event;
    e.preventDefault();
  },
  false
);
window.addEventListener(
  "drop",
  function (e) {
    e = e || event;
    e.preventDefault();
  },
  false
);
function Publish({ userToken }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [etat, setEtat] = useState("");
  const [lieu, setLieu] = useState("");
  const [prix, setPrix] = useState("");
  const [exchange, setExchange] = useState(false);
  const [published, setEPublished] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(null);
  const [hoverClass, setHoverClass] = useState(false);
  const token = userToken;
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === "") navigate("/login", { state: { from: "/publish" } });
  }, []);

  const dropHandler = (ev) => {
    //console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    //console.log(ev.dataTransfer);

    setFile(ev.dataTransfer.files[0]);
    setPreviewPicture(URL.createObjectURL(ev.dataTransfer.files[0]));
    // if (ev.dataTransfer.items) {
    //   // Use DataTransferItemList interface to access the file(s)
    //   [...ev.dataTransfer.items].forEach((item, i) => {
    //     // If dropped items aren't files, reject them
    //     if (item.kind === "file") {
    //       const file = item.getAsFile();
    //       console.log(`… file[${i}].name = ${file.name}`);
    //     }
    //   });
    // } else {
    //   // Use DataTransfer interface to access the file(s)
    //   [...ev.dataTransfer.files].forEach((file, i) => {
    //     console.log(`… file[${i}].name = ${file.name}`);
    //   });
    //}
  };

  const dragOverHandler = (ev) => {
    ev.preventDefault();
    setHoverClass(true);
  };

  const downloadFile = (event) => {
    setFile(event.target.files[0]);
    setPreviewPicture(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="publish">
      <p>Vends ton article</p>

      {!published ? (
        <form
          onDrag={(e) => {
            e.preventDefault;
          }}
          onDrop={(e) => {
            e.preventDefault;
          }}
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("picture", file);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("brand", marque);
            formData.append("size", taille);
            formData.append("color", couleur);
            formData.append("condition", etat);
            formData.append("city", lieu);
            formData.append("price", prix);
            formData.append("exchange", exchange);

            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                formData,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              setEPublished(true);
            } catch (err) {
              if (err.response.status === 500) {
                console.error("An error occurred");
              } else {
                console.error(err.response.data);
              }
            }
          }}
        >
          <div className="publishImg">
            {previewPicture ? (
              <img
                src={previewPicture}
                alt="preview"
                className="preview"
                onClick={() => {
                  setPreviewPicture("");
                  setHoverClass(false);
                }}
              />
            ) : (
              <>
                <input
                  type="file"
                  onChange={(event) => {
                    downloadFile(event);
                  }}
                  className="inputfile"
                  name="file"
                  id="file"
                />
                <label htmlFor="file">Selectionnez votre photo</label>

                <div
                  id="drop_zone"
                  onDrop={(event) => {
                    dropHandler(event);
                  }}
                  onDragOver={(event) => {
                    dragOverHandler(event);
                  }}
                  onDragLeave={() => {
                    setHoverClass(false);
                  }}
                  className={hoverClass ? "drop-hover" : ""}
                >
                  <p>
                    Glisse une image dans cette <i>zone</i>.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="publishTitle">
            <div>
              <label htmlFor="titre">TITRE</label>{" "}
              <input
                type="text"
                placeholder="titre"
                id="titre"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="description">DESCRIPTION</label>
              <textarea
                rows="4"
                cols="50"
                placeholder="description"
                id="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              >
                {" "}
              </textarea>
            </div>
          </div>
          <div className="publishDetail">
            <input
              type="text"
              placeholder="marque"
              value={marque}
              onChange={(event) => {
                setMarque(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="taille"
              value={taille}
              onChange={(event) => {
                setTaille(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="couleur"
              value={couleur}
              onChange={(event) => {
                setCouleur(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="etat"
              value={etat}
              onChange={(event) => {
                setEtat(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="lieu"
              value={lieu}
              onChange={(event) => {
                setLieu(event.target.value);
              }}
            />
          </div>
          <div className="publishPrice">
            <input
              type="number"
              placeholder="prix"
              value={prix}
              onChange={(event) => {
                setPrix(event.target.value);
              }}
            />
            <input
              type="checkbox"
              id="exchange"
              name="exchange"
              checked={exchange}
              onChange={() => {
                setExchange(!exchange);
              }}
            />
            <label htmlFor="exchange">Je suis intéressé par les échanges</label>
          </div>
          <button>Ajouter</button>
        </form>
      ) : (
        <p>Votre annonce est publiée</p>
      )}
    </div>
  );
}

export default Publish;
