export class ColorDefinitionService{
    public shouldTextBeBlack (backgroundcolor: string): boolean {
        return this.computeLuminence(backgroundcolor) > 0.179;
    }
    
    private computeLuminence(backgroundcolor: string): number {
        var colors = this.hexToRgb(backgroundcolor);
        if (!colors)
            return 1;

        var components = ['r', 'g', 'b'];
        for (var i in components) {
            var c = components[i];
            
            colors[c as keyof typeof colors] = colors[c as keyof typeof colors] / 255.0;

            if (colors[c as keyof typeof colors] <= 0.03928) { 
                colors[c as keyof typeof colors] = colors[c as keyof typeof colors]/12.92;
            } else { 
                colors[c as keyof typeof colors] = Math.pow (((colors[c as keyof typeof colors] + 0.055) / 1.055), 2.4);
            }
        }
        
        var luminence = 0.2126 * colors.r + 0.7152 * colors.g + 0.0722 * colors.b;

        return luminence;
    }
    
    // private hexToRgb(hex: string): number[] | null {
    //     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    //     if(!result)
    //         return null;

    //     var rgb = new Array<number>();
    //     rgb.push(parseInt(result[1], 16));
    //     rgb.push(parseInt(result[2], 16));
    //     rgb.push(parseInt(result[3], 16));

    //     return rgb;
    // }
    private hexToRgb(hex:  string) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}