import React, { useState } from "react";

export function useLogin() {
    const [authState] = useState(false);
    const [currentUser] = useState(null);

    return [currentUser, authState];
}