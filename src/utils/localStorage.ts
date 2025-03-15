export const saveDraft = (formData: any) => {
    localStorage.setItem('jobFormDraft', JSON.stringify(formData))
}

export const getDraft = () => {
    const draft = localStorage.getItem('jobFormDraft')
    return draft ? JSON.parse(draft) : null
}

export const clearDraft = () => {
    localStorage.removeItem('jobFormDraft')
}
