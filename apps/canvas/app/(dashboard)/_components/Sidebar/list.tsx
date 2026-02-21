"use client"

export const List = () => {

    // TODODO Fetch UserMembership from organization lists if no usermembership return null and remove this any type
    const userMemberships: any[] = []
    if (!userMemberships.length) {
        return null
    }
    return (
        <ul className="space-y-4">
            {userMemberships.map((membership) => (
                <p key={membership.id}>
                    {membership.organization.name}
                </p>
            ))}
        </ul>
    )
}