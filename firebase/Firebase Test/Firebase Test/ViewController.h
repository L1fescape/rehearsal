//
//  ViewController.h
//  Firebase Test
//
//  Created by Andrew on 3/8/13.
//  Copyright (c) 2013 Andrew. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Firebase/Firebase.h>

@interface ViewController : UIViewController
@property (weak, nonatomic) IBOutlet UITextField *name;
@property (weak, nonatomic) IBOutlet UITextField *location;
@property (weak, nonatomic) IBOutlet UIButton *submit;

-(IBAction)submitTouched;

@end
