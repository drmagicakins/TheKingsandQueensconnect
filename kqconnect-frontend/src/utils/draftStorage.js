// utils/draftStorage.js
export const saveDraft = (data) => {
  localStorage.setItem("question_draft", JSON.stringify(data));
};

export const loadDraft = () => {
  const draft = localStorage.getItem("question_draft");
  return draft ? JSON.parse(draft) : null;
};

export const clearDraft = () => {
  localStorage.removeItem("question_draft");
};
