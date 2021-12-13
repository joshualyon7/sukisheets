
// conforms to the api at https://api.open5e.com/spells
export interface Spell {
    slug: string,
    name: string,
    desc: string,
    higher_level: string,
    page: string,
    range: string,
    components: string,
    material: string,
    ritual: string,
    duration: string,
    concentration: string,
    casting_time: string,
    level: string,
    level_int: number,
    school: string,
    dnd_class: string,
    archetype: string,
    circles: string,
    document__slug: string,
    document__title: string,
    document__license_url: string
}
