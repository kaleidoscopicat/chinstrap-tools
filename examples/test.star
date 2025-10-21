@property("MainTex", 2D) $$ Since this got defined before...
@uniform(Props)

Props {
    MainTex_sampler: SamplerState
    Tint: Color = Color(1.0, 1.0, 1.0, 1.0)
    LightDir: Vector3 = Vector3(0.0, 0.0, 1.0)
}

myVariable = "Hello, World!";

fn frag(int x, int y) {
    final = sample(MainTex)
    return final
}