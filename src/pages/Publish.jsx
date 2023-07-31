import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../styles/publish.css";

window.addEventListener(
  "dragover",
  function (e) {
    e.preventDefault();
  },
  false
);
window.addEventListener(
  "drop",
  function (e) {
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

  const [published, setEPublished] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(null);
  const [hoverClass, setHoverClass] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === "") navigate("/login", { state: { from: "/publish" } });
  }, []);

  const dropHandler = (ev) => {
    ev.preventDefault();

    setFile(ev.dataTransfer.files[0]);
    setPreviewPicture(URL.createObjectURL(ev.dataTransfer.files[0]));
  };

  const dragOverHandler = (ev) => {
    ev.preventDefault();
    setHoverClass(true);
  };

  const downloadFile = (event) => {
    setFile(event.target.files[0]);
    setPreviewPicture(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
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

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEPublished(true);
      setProcessing(false);
    } catch (err) {
      if (err.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(err.response.data);
      }
    }
  };

  return processing ? (
    <Spinner />
  ) : (
    <main className="container publish">
      {!published ? (
        <form
          onDrag={(e) => {
            e.preventDefault;
          }}
          onDrop={(e) => {
            e.preventDefault;
          }}
          onSubmit={handleSubmit}
          className="custom-form"
        >
          <h2>Vends ton article</h2>
          <div className="publish-img">
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
                <p>OU</p>
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
                    Glisses une image dans cette <i>zone</i>.
                  </p>
                </div>
              </>
            )}
          </div>
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
            ></textarea>
          </div>
          <div>
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
            <input
              type="number"
              placeholder="prix"
              value={prix}
              onChange={(event) => {
                setPrix(event.target.value);
              }}
            />
          </div>

          <button className="publish-button">Publier</button>
        </form>
      ) : (
        <p>Votre annonce est publiée</p>
      )}
    </main>
  );
}

export default Publish;
