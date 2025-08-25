import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  // --- ajout d'etats pour chaque champ du formulaire  ---
  const [sending, setSending] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ---modifie la fonction d'envoie pour les valeurs des champs et pour qu'ensuite on appelle la fonction onSuccess---
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        if (onSuccess) onSuccess({ nom, prenom, type, email, message }); // appel de la fonction avec les champs
        // une fois le formulaire envoyé, on réinitiliase le formulaire
        setNom("");
        setPrenom("");
        setType("");
        setEmail("");
        setMessage("");
      } catch (err) {
        setSending(false);
        if (onError) onError(err);
      }
    },
    [nom, prenom, type, email, message, onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          {/* --- On utilise useState pour stocker les valeurs des champs --- */}
          <Field
            placeholder=""
            label="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <Field
            placeholder=""
            label="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={(val) => setType(val)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={type}
          />
          <Field
            placeholder=""
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          {/* --- Pareil pour le champ de message --- */}
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
