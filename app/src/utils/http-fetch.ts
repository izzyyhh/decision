import config from "@app/config";

export async function postPostImages(files: File[], authToken: string) {
    const formData = new FormData();
    files.map((file) => formData.append("images", file));

    const res = await fetch(`${config.REACT_APP_API_URL}/upload/post-images`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
    });
    return await res.json();
}

export async function postProfilePicture(file: File, authToken: string) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${config.REACT_APP_API_URL}/upload/profile-picture`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
    });
    return await res.json();
}
